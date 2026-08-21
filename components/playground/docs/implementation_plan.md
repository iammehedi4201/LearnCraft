# LearnCraft Playground — Implementation Plan

> Based on the full analysis report. All changes are organized into **4 Phases** that can be implemented and tested independently. TypeScript remains the primary runtime throughout; the architecture is future-proofed for multi-language support from Phase 1.

---

## Implementation Strategy

| Phase | Theme | Goal |
|---|---|---|
| **Phase 1** | Critical Bug Fixes & Security | Fix every P0 bug — the playground must be correct and safe first |
| **Phase 2** | Editor Reliability & UX Polish | Fix P1 bugs — make the editor reliable and pleasant to use |
| **Phase 3** | Performance & New Features | P2 items — make the playground fast and add high-value features |
| **Phase 4** | Multi-Language Architecture | P3 items — lay the foundation for new runtimes without breaking anything |

> [!IMPORTANT]
> Phases are ordered by dependency. Phase 2 relies on Phase 1 fixes (especially the undo/cursor race conditions). Phase 4 relies on Phase 2 (language-aware highlighter is needed before autocomplete refactor).

---

## Open Questions

> [!IMPORTANT]
> Please answer these before implementation begins:

1. **Undo system strategy (EDITOR-02):** The custom undo system (`undoStackRef`) and the browser's native undo currently conflict. Two options:
   - **Option A (Recommended):** Remove the custom undo stack entirely and rely 100% on the browser's native undo. This is simpler but loses undo across format/auto-close operations.
   - **Option B:** Integrate custom undo properly by also pushing to the stack on every `handleChange` character typed (throttled). More work but gives full undo history.

2. **Reset / Apply Solution confirmation (UX-07/08):** Should we use a browser `confirm()` dialog, or an inline "Are you sure?" button that replaces the Reset button for 2 seconds?

3. **Cancel execution (FEAT-03 / Phase 3):** Should "Stop" be a dedicated button that only appears while code is running, or should the Run button toggle between "Run" and "Stop"?

4. **localStorage auto-save (FEAT-07):** Should it save per exercise ID, per runtime type, or always (even for standalone playground with no exercise)?

5. **Formatter (IMP-01):** The current formatter is fully custom regex-based. For Phase 3 should we:
   - **Option A:** Fix the existing formatter's brace-counting bug (count only after placeholder substitution).
   - **Option B:** Integrate `prettier` with `@prettier/plugin-babel` + `prettier/parser-typescript` as a browser build. Adds ~300KB gzipped but gives production-quality formatting.

---

## Phase 1 — Critical Bug Fixes & Security

**Goal:** Fix all P0 bugs and the most impactful P1 bugs. The playground should be correct, secure, and not break during normal use by the time Phase 1 is done.

---

### Component: `runtimes/typescript-runtime.ts`

#### [MODIFY] [typescript-runtime.ts](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/typescript-runtime.ts)

**BUG-04 — Fix un-interpolated timeout string**
- Line 359: Change `'Execution timed out after ${timeLimit / 1000} seconds...'` (single-quoted string) to a backtick template literal so `${timeLimit / 1000}` is evaluated at runtime.

**BUG-02 — Add `event.source` validation to iframe `handleMessage`**
- In both `run()` (L632) and `validate()` (L892) iframe paths, store a reference to the created iframe before calling `window.addEventListener`. Inside `handleMessage`, add: `if (event.source !== iframe.contentWindow) return;`
- This prevents any other window/frame from forging a `playground-done` or `playground-error` message.

**BUG-03 — Fix `postMessage` target origin in sandboxed iframe HTML**
- In `buildSandboxHtml` (L277–L384), change all `window.parent.postMessage({ ... }, '*')` calls to use the correct parent origin. Since the iframe is sandboxed with `allow-scripts` only, use a pre-serialized origin string injected into the HTML at build time: `const _origin = ${JSON.stringify(typeof window !== 'undefined' ? window.location.origin : '*')};` then `window.parent.postMessage({...}, _origin);`

**BUG-05 — Fix double-transpilation in validation iframe path**
- In `buildValidationHtml` (L388–L420), the function currently concatenates pre-transpiled user code with raw test code, then passes the whole thing to `buildSandboxHtml` which transpiles it again.
- Fix: Build a pure JS sandbox HTML directly instead of calling `buildSandboxHtml`. Transpile the test code snippets separately and inject all code already-transpiled. A new private method `buildRawSandboxHtml(jsCode: string, timeLimit: number)` that takes already-transpiled JS (no TypeScript processing) should be created and used by the validation path.

**BUG-11 — Extend loop guard to `for` loops**
- After the `while` guard regex (L264), add equivalent guards for `for(;;)` and `for(let ...;;)` infinite loop forms. Specifically: guard `for\s*\(([^)]*;[^)]*;[^)]*)\)` patterns where the increment expression is empty or trivially non-terminating.
- Also add a call counter guard injected at function scope for recursive calls (optional, effort M).

**ERR-01 — Graceful degradation for unsupported runtimes**
- `createRuntime` currently throws. Change it to return a lightweight `NoopRuntime` implementation that:
  - `run()` returns `{ success: false, output: [{ type: "info", content: "🚧 ${label} runtime is coming soon! Currently TypeScript and JavaScript are supported." }] }`
  - All `supports*` flags set to `false`
  - `reset()` and `dispose()` are no-ops
- This eliminates the unhandled throw in `getRuntime()`.

**ERR-03 — Log transpiler fallback silently to console**
- In `transpileTypeScriptLocally` catch block (L144), add `console.warn("[Playground] ts.transpileModule failed, using regex fallback:", e)` so developers can see when the fallback fires without exposing it to users.

---

### Component: `Playground.tsx`

#### [MODIFY] [Playground.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx)

**BUG-01 — Fix double-run in `handleCheck`**
- Extract the "run and show output" call from `handleCheck` into a private async helper `runAndSetOutput(codeToRun: string)` that does NOT touch `isRunning` state — it just calls `rt.run()` and returns the result.
- `handleCheck` manages `isRunning` itself (single `setIsRunning(true)` at start, `setIsRunning(false)` in `finally`).
- When `rt.validate` is absent, call `runAndSetOutput` inline instead of delegating to `handleRun`.
- When `rt.validate` is present, call `rt.validate` then `runAndSetOutput` sequentially within the same `isRunning` guard.

**BUG-07 — Fix stale `ratio1` closure in 3-pane resizer**
- Convert `ratio1` and `ratio2` to `useRef` values (or read them from refs inside the event handler) so the mouse/touch move handler always reads the latest values.
- Pattern: `const ratio1Ref = useRef(ratio1); useEffect(() => { ratio1Ref.current = ratio1; }, [ratio1]);` then use `ratio1Ref.current` inside the drag handler.

**BUG-08 — Terminate Worker on Reset**
- Add `workerRef = useRef<Worker | null>(null)` to `Playground.tsx`.
- When the Worker is created in `typescript-runtime.ts`, expose a way to terminate it (add a `terminateCurrentWorker?(): void` method to the `PlaygroundRuntime` interface, optional).
- Simpler alternative: `TypeScriptRuntime.reset()` should store the active Worker reference and terminate it. Update `reset()` to call `this.currentWorker?.terminate()`.

**BUG-09 — Fix deprecated `document.execCommand("copy")` fallback**
- In `handleCopy` (and `PlaygroundExamplePanel.handleCopyCode`), replace the `execCommand` fallback with:
  ```ts
  // Modern fallback: create a temporary input, focus it, and show a message
  // if clipboard API fails entirely.
  // Most modern browsers support navigator.clipboard even without HTTPS in localhost.
  ```
- Show a small inline "Copy failed — please use Ctrl+C" message instead of the silent execCommand.

**BUG-12 — Destructure `minHeight` from props**
- Add `minHeight` to the destructured props in the `Playground` function signature.
- Pass it through to the `playground-body` `style` where `height` is currently used.

**BUG-13 — Fix `PlaygroundFullscreen` overflow leak on unmount**
- Move the cleanup outside the `if (isOpen)` condition: always return a cleanup function from the `useEffect`. Use the effect's dependency on `isOpen` — when `isOpen` goes false or the component unmounts, cleanup always fires.

**IMP-07 — Fix silent copy fallback in 3-pane mode**
- Change `const textToCopy = is3Pane ? (practiceCode || exampleCode) : code;` to `const textToCopy = is3Pane ? practiceCode : code;` — copy empty string if practice is empty, do not silently fall back to example code.

**UX-06 — Fix `hintsUsed` out of sync with revealed count**
- Lift `revealedCount` state from `PlaygroundHints` up to `Playground.tsx`.
- Pass `revealedCount` and `onReveal` (a callback that increments it) as props to `PlaygroundHints`.
- The toolbar `hintsUsed` now reflects actual revealed hints, not button-click count.
- `revealedCount` persists across the hints panel being toggled open/closed.

**UX-07/08 — Add confirmation before Reset and Apply Solution**
- For Reset: after the first click, show "Really reset? (click again to confirm)" state for 2 seconds, then auto-reset back to normal button. Second click within 2s actually resets.
- For Apply Solution: same double-click confirmation pattern in `PlaygroundHints`.
- No browser dialog — inline button state change only.

---

### Component: `PlaygroundFullscreen.tsx`

#### [MODIFY] [PlaygroundFullscreen.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundFullscreen.tsx)

**BUG-13 — Always run cleanup**
```ts
useEffect(() => {
  if (isOpen) {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
  }
  // Cleanup always runs (unmount OR isOpen → false)
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";
  };
}, [isOpen, handleKeyDown]);
```

**UX-12 — Add focus trap**
- On open, use `useEffect` to move focus to the fullscreen overlay container.
- Add a `onKeyDown` handler to the overlay that captures `Tab` and `Shift+Tab` and cycles focus only within the overlay's focusable children.

---

### Component: `PlaygroundOutput.tsx`

#### [MODIFY] [PlaygroundOutput.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundOutput.tsx)

**BUG-10 — Reset `showTechnical` when `error` changes**
```ts
const prevErrorRef = useRef(error);
useEffect(() => {
  if (error !== prevErrorRef.current) {
    setShowTechnical(false);
    prevErrorRef.current = error;
  }
}, [error]);
```

**ERR-04 — Show a success message when no output is produced**
- After successful execution with empty `lines` and no `error`, show a placeholder: `✓ Code ran successfully (no console output)` in `info` style.

---

### Component: `PlaygroundExamplePanel.tsx`

#### [MODIFY] [PlaygroundExamplePanel.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundExamplePanel.tsx)

**BUG-14 — Pass language to `highlightCode`**
- Rename `_language` to `language` (remove underscore prefix).
- Pass `language` to `highlightCode(code, language)` (after Phase 2 adds the language parameter to the highlighter).
- For Phase 1 (before highlighter accepts language): just rename to avoid the misleading `_` prefix; the highlighting still defaults to TS which is correct for now.

---

## Phase 2 — Editor Reliability & UX Polish

**Goal:** Make the editor's cursor, scroll, undo, and keyboard behaviour rock-solid. Add the status bar, Stop button, and auto-save. Fix autocomplete overflow.

---

### Component: `PlaygroundEditor.tsx`

#### [MODIFY] [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx)

**EDITOR-01 — Replace hardcoded `CHAR_WIDTH_PX` with measured value**
- Remove the `CHAR_WIDTH_PX = 7.82` constant.
- Add a `useLayoutEffect` that runs once after mount to measure the actual character width:
  ```ts
  const measuredCharWidthRef = useRef(7.82); // fallback
  useLayoutEffect(() => {
    if (!textareaRef.current) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const style = window.getComputedStyle(textareaRef.current);
    ctx.font = `${style.fontSize} ${style.fontFamily}`;
    measuredCharWidthRef.current = ctx.measureText("M").width; // monospace: M ≈ average width
  }, []);
  ```
- Replace all `CHAR_WIDTH_PX` usages in `scrollCursorIntoView` with `measuredCharWidthRef.current`.
- Re-measure on window resize via a `ResizeObserver` on the textarea.

**EDITOR-02 — Resolve undo system conflict**
*(Implement whichever Option A or B is chosen in Open Questions.)*
- **Option A:** Remove `undoStackRef`, `redoStackRef`. Remove custom Ctrl+Z/Y handlers. Let the browser handle all undo natively. Keep `applyTextEdit` but stop pushing to a custom stack. The textarea's native undo will properly undo Tab indent, auto-close, etc. because `document.execCommand("insertText", false, text)` triggers native undo — but this requires changing `applyTextEdit` to use `execCommand` or `InputEvent` dispatch instead of direct `value` setting.
- **Option B:** Push a snapshot to `undoStackRef` in `handleChange` as well (throttled to one snapshot per 500ms of continuous typing), making both systems unified.

**EDITOR-03 — Fix rAF cursor race with React re-render**
- The root cause is `onChange(newFullValue)` triggering a React re-render before the rAF fires.
- Fix: Use `useLayoutEffect` (synchronous after DOM paint) to set cursor position instead of `requestAnimationFrame`. The pattern:
  ```ts
  const pendingCursorRef = useRef<{ start: number; end: number } | null>(null);
  
  // In applyTextEdit:
  pendingCursorRef.current = { start: newCursorStart, end: newCursorEnd };
  onChange(newFullValue);
  
  // New useLayoutEffect:
  useLayoutEffect(() => {
    if (pendingCursorRef.current && textareaRef.current) {
      textareaRef.current.selectionStart = pendingCursorRef.current.start;
      textareaRef.current.selectionEnd = pendingCursorRef.current.end;
      pendingCursorRef.current = null;
    }
  });
  ```

**EDITOR-04 — Fix error line highlight drift on scroll**
- Change error highlight positioning to use `position: absolute; top: ${PADDING_TOP_PX + (errorLine-1)*LINE_HEIGHT_PX}px` inside the scrollable `playground-editor-stage` element (which already scrolls with the textarea).
- Remove the `translateY(-${top}px)` transform entirely. The absolute positioning inside the same scroll container will always stay aligned.

**EDITOR-05 — Use `textareaRef.current` in `handleKeyDown`**
- Replace `const textarea = e.currentTarget;` with `const textarea = textareaRef.current;` at the top of `handleKeyDown`. Add a null check: `if (!textarea) return;`

**EDITOR-10 — Expand smart Enter to `[...]` and `(...)`**
- In the Enter handler (L577–L594), add parallel handling for `[` / `]` and `(` / `)` pairs alongside the existing `{` / `}` logic.

**PERF-01 — Memoize `highlightCode` result**
- Wrap the JSX call in `useMemo`:
  ```tsx
  const highlightedNodes = useMemo(
    () => highlightCode(value, cursorOffset, language),
    [value, cursorOffset, language]
  );
  ```
- This ensures highlighting only re-runs when `value` or `cursorOffset` actually changes, not on every unrelated render.

**PERF-03 — Memoize line number array**
- Replace the `Array.from(...)` in JSX with a `useMemo`:
  ```tsx
  const lineNumbers = useMemo(() =>
    Array.from({ length: lineCount }, (_, i) => i + 1),
    [lineCount, errorLine]
  );
  ```

**PERF-04 — Consolidate `syncScrollLayers` calls**
- In `applyTextEdit`, remove the rAF call to `syncScrollLayers()` (it will be called by `useLayoutEffect` and by the native scroll listener naturally).
- The `useLayoutEffect` and native scroll listener are sufficient — no rAF chain needed.

**FEAT-04 — Add Line/Column status bar**
- Derive `cursorLine` and `cursorCol` from `cursorOffset` and `value`:
  ```ts
  const { cursorLine, cursorCol } = useMemo(() => {
    if (cursorOffset === null) return { cursorLine: 1, cursorCol: 1 };
    const before = value.substring(0, cursorOffset);
    const line = (before.match(/\n/g) || []).length + 1;
    const col = before.length - before.lastIndexOf("\n");
    return { cursorLine: line, cursorCol: col };
  }, [cursorOffset, value]);
  ```
- Render a `<div className="playground-statusbar">` below the editor stage:
  ```tsx
  <div className="playground-statusbar">
    <span>Ln {cursorLine}, Col {cursorCol}</span>
    <span>{value.length} chars</span>
    <span>{lineCount} lines</span>
  </div>
  ```

**EDITOR-06 — Add Go to Line (Ctrl+G)**
- In `handleKeyDown`, add:
  ```ts
  if ((e.ctrlKey || e.metaKey) && e.key === "g") {
    e.preventDefault();
    const lineNum = parseInt(prompt("Go to line:") || "", 10);
    if (!isNaN(lineNum) && lineNum > 0) {
      const targetOffset = value.split("\n").slice(0, lineNum - 1).join("\n").length + (lineNum > 1 ? 1 : 0);
      applyTextEdit(value, targetOffset, targetOffset, false);
    }
  }
  ```
  *(Uses browser `prompt()` for simplicity — can be replaced with inline input in a future iteration.)*

---

### Component: `autocomplete/AutocompletePopover.tsx`

#### [MODIFY] [AutocompletePopover.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/autocomplete/AutocompletePopover.tsx)

**IMP-03 — Add `max-height` and scroll to the suggestion list**
- In `playground.css`, add:
  ```css
  .playground-ac-list {
    max-height: 200px;
    overflow-y: auto;
  }
  ```
- No component code change needed.

---

### Component: `PlaygroundToolbar.tsx`

#### [MODIFY] [PlaygroundToolbar.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundToolbar.tsx)

**UX-02 — Update disabled Run button tooltip dynamically**
- Pass `isRunning` to the Run button's `title` prop:
  ```tsx
  title={isRunning ? "Code is running… (Ctrl+Enter)" : "Run code (Ctrl+Enter)"}
  ```

**FEAT-03 — Add Stop/Cancel button**
- Add `onStop?: () => void` prop to `PlaygroundToolbarProps`.
- When `isRunning && onStop`, replace (or augment) the Run button with a "⏹ Stop" button.
- In `Playground.tsx`, `onStop` calls `getRuntime().terminateCurrentWorker?.()` and `setIsRunning(false)`.
- In `TypeScriptRuntime`, add `terminateCurrentWorker(): void` that stores the active Worker in `this.currentWorker` and terminates it.

**UX-05 — Fix copy toast positioning**
- Wrap the Copy button in `position: relative`.
- Change the toast to `position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%)` so it appears above the button.

**PERF-07 — Add responsive toolbar**
- In `playground.css`, add a breakpoint at `480px` that collapses the text labels on toolbar buttons, showing only icons. All buttons remain clickable with `title` tooltip for accessibility.
  ```css
  @media (max-width: 480px) {
    .playground-btn span:not(.playground-btn-icon) { display: none; }
  }
  ```

---

### Component: `PlaygroundHints.tsx`

#### [MODIFY] [PlaygroundHints.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundHints.tsx)

**UX-07 — Double-click confirmation before Apply Solution**
- Add `confirmApply` state (boolean). First click sets `confirmApply = true` and shows "Click again to apply (replaces your code)". Second click calls `onApplySolution`. Auto-reset after 3 seconds.

**ERR-06 — Accept `revealedCount` as prop (lifted state from Phase 1 UX-06 fix)**
- Remove internal `revealedCount` state.
- Accept `revealedCount: number` and `onRevealNext: () => void` as props.
- `Playground.tsx` holds and persists `revealedCount` across mode switches.

---

### Feature: `playground.css`

#### [MODIFY] [playground.css](file:///f:/My%20Projects/LearnCraft/components/playground/playground.css)

- Add `.playground-statusbar` styles (bottom bar, monospace font, muted text, flex row).
- Add `.playground-ac-list { max-height: 200px; overflow-y: auto; }`.
- Add responsive toolbar breakpoint styles.
- Add focus-visible ring on editor wrapper for UX-01 (clickable indicator):
  ```css
  .playground-editor-wrapper:focus-within {
    outline: 1px solid var(--playground-accent, #5b6af0);
    outline-offset: -1px;
  }
  ```

---

## Phase 3 — Performance & New Features

**Goal:** Make the playground fast for large files. Add high-value features: auto-save, execution history, keyboard cheat sheet.

---

### Component: `syntax-highlighter.tsx`

#### [MODIFY] [syntax-highlighter.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/syntax-highlighter.tsx)

**IMP-04 / ARCH-02 — Add language parameter to `highlightCode`**
- Change signature to: `highlightCode(code: string, language: string, cursorOffset?: number | null): ReactNode[]`
- Add a `language` parameter to the function (currently just `code` and `cursorOffset`).
- Dispatch to different `TOKEN_RULES` sets based on language:
  - `typescript` / `javascript`: current rules (unchanged)
  - `sql`: SQL-specific keyword set only, remove TS-specific tokens
  - `html`: tag/attribute/string rules
  - `css`: property/value/selector rules
  - `default`: falls back to TypeScript rules for forward compatibility
- Update all call sites: `PlaygroundEditor.tsx` (L722), `PlaygroundExamplePanel.tsx` (L107) to pass `language`.

---

### Component: `autocomplete/use-autocomplete.ts`

#### [MODIFY] [use-autocomplete.ts](file:///f:/My%20Projects/LearnCraft/components/playground/autocomplete/use-autocomplete.ts)

**PERF-02 — Debounce `parseCodeScope`**
- The code scope is only needed when the autocomplete popover is open. Add a 300ms debounce on re-parsing:
  ```ts
  const debouncedValue = useDebounce(value, 300); // custom hook or use-debounce lib
  const codeScope = useMemo(() => parseCodeScope(debouncedValue), [debouncedValue]);
  ```
- `parseCodeScope` only runs 300ms after the user stops typing, not on every keystroke.

**IMP-02 — Add simple subsequence/fuzzy matching**
- Extend the suggestion filter to also include items where the prefix is a subsequence of the label (each character of prefix appears in order in the label).
- Sort exact-prefix matches first, then subsequence matches, then by `boost` score.
- Example: typing `mth` matches `Math` because m→M, t→t, h→h appear in order.

---

### Component: `autocomplete/suggestion-data.ts`

#### [MODIFY] suggestion-data.ts → split into language files

**PERF-05 / ARCH-03 — Lazy-load suggestion data**
- Split `suggestion-data.ts` into separate files:
  - `suggestion-data-typescript.ts` — TS/JS-specific suggestions (current content)
  - `suggestion-data-sql.ts` — SQL keywords (future)
  - `suggestion-data-html.ts` — HTML tags/attributes (future)
- In `use-autocomplete.ts`, replace the static import with:
  ```ts
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  useEffect(() => {
    getSuggestionsForLanguage(language).then(setSuggestions);
  }, [language]);
  ```
- `getSuggestionsForLanguage` uses `dynamic import()` to load only the relevant data file.

---

### Component: `Playground.tsx`

#### [MODIFY] [Playground.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx)

**FEAT-07 — Auto-save to localStorage**
- Add a `useEffect` that saves `code` (or `practiceCode`) to localStorage whenever it changes, debounced to 1 second:
  ```ts
  const storageKey = exercise?.id ? `playground-draft-${exercise.id}` : `playground-draft-${runtimeType}`;
  
  // On mount: restore saved draft
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setCode(saved);
  }, [storageKey]);
  
  // On change: save draft (debounced)
  useEffect(() => {
    const timer = setTimeout(() => localStorage.setItem(storageKey, code), 1000);
    return () => clearTimeout(timer);
  }, [code, storageKey]);
  ```
- On Reset, also clear the saved draft: `localStorage.removeItem(storageKey)`.

**FEAT-01 — Execution history log**
- Add `executionHistory` state: `useState<{ code: string; output: OutputLine[]; error?: PlaygroundError; duration?: number; timestamp: number }[]>([])`.
- After each run, push the result to `executionHistory` (cap at 10 entries).
- Add a "History" toggle button in the toolbar that shows a collapsible panel of past runs.
- Each history entry shows: timestamp, duration badge, first output line, expand arrow.

**FEAT-08 — Keyboard shortcut cheat sheet**
- Add `showShortcuts` state (boolean).
- Handle `F1` keydown in the global `useEffect` keyboard handler.
- Render a `<dialog>` or overlay showing all shortcuts in a table.
- Include: Ctrl+Enter (Run), Ctrl+Shift+Enter (Check), Shift+Alt+F (Format), Alt+Z (Wrap), Ctrl+/ (Comment), Ctrl+D (Duplicate), Ctrl+G (Go to Line), Ctrl+Z/Y (Undo/Redo), Esc (Close fullscreen).

**IMP-05 — Wire `exercise.timeLimit` to runtime**
- Pass `exercise?.timeLimit ?? 5000` to `rt.run()` and `rt.validate()` as an additional parameter.
- Add `timeLimit?: number` to `PlaygroundInput` type.
- In `TypeScriptRuntime.run()`, use `input.timeLimit ?? 4000` for the Worker timeout instead of the hardcoded 4000.

---

### Component: `code-formatter.ts`

#### [MODIFY] [code-formatter.ts](file:///f:/My%20Projects/LearnCraft/components/playground/code-formatter.ts)

**IMP-01 — Fix brace counting running inside string placeholders**
- Currently: brace counting (L94–L100) runs on `line` which still contains placeholder IDs like `__LC_PH_xxx__`. Placeholders don't contain braces, so this is safe in the current code — but the placeholder IDs are counted as regular tokens, which can cause issues if future placeholder patterns change.
- More important fix: the `case` indent calculation uses `indentLevel - 0.5` which floored gives `0` — `case` lines end up at the same indent as `switch` body. Fix to `indentLevel - 1` (unindent by 1 full level, which is correct for `case`).
- **If Option B (Prettier) was chosen:** Replace `code-formatter.ts` with a thin wrapper around Prettier's browser build.

---

## Phase 4 — Multi-Language Architecture

**Goal:** Lay the foundation so that new runtimes (HTML, SQL, Python, etc.) can be registered and used without modifying any existing component code. TypeScript continues to be the only runtime in use.

---

### Component: `types.ts`

#### [MODIFY] [types.ts](file:///f:/My%20Projects/LearnCraft/components/playground/types.ts)

**ARCH-01 — Extend `PlaygroundRuntime` interface with metadata fields**
```ts
export interface PlaygroundRuntime {
  // ── Existing methods ──
  run(input: PlaygroundInput): Promise<ExecutionResult>;
  reset(): void;
  validate?(input: PlaygroundInput, tests: TestCase[], hiddenTests?: TestCase[]): Promise<ValidationResult>;
  dispose?(): void;
  terminateCurrentWorker?(): void;  // NEW (Phase 2)

  // ── Capability flags (existing) ──
  supportsPreview: boolean;
  supportsConsole: boolean;
  supportsTests: boolean;
  supportsMultipleFiles: boolean;

  // ── NEW: Metadata ──
  readonly displayName: string;          // "TypeScript", "SQL", etc.
  readonly fileExtension: string;        // ".ts", ".sql", ".html"
  readonly defaultTimeout: number;       // ms
  readonly supportsFormat: boolean;      // Can the formatter handle this language?
  readonly supportsStdin: boolean;       // Supports simulated console.input()?
  readonly monacoLanguageId?: string;    // For future Monaco integration
}
```

**ARCH-01 — Add `PlaygroundInput.timeLimit`**
```ts
export interface PlaygroundInput {
  code: string;
  language: PlaygroundRuntimeType;
  files?: PlaygroundFile[];
  timeLimit?: number;  // NEW: per-execution override in ms
}
```

**ARCH-05 — Add `RuntimeCapabilities` derived type**
```ts
export interface RuntimeCapabilities {
  canFormat: boolean;
  canWordWrap: boolean;
  canCheck: boolean;
  canPreview: boolean;
  canShare: boolean;
  canHistory: boolean;
  canMultipleFiles: boolean;
}

export function getCapabilities(runtime: PlaygroundRuntime, hasExercise: boolean): RuntimeCapabilities {
  return {
    canFormat: runtime.supportsFormat,
    canWordWrap: true,
    canCheck: hasExercise && !!runtime.validate,
    canPreview: runtime.supportsPreview,
    canShare: true,
    canHistory: runtime.supportsConsole,
    canMultipleFiles: runtime.supportsMultipleFiles,
  };
}
```

---

### Component: `runtimes/runtime-registry.ts`

#### [MODIFY] [runtime-registry.ts](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/runtime-registry.ts)

**ARCH-04 — Replace `switch` with a Map-based registry**
```ts
type RuntimeFactory = () => PlaygroundRuntime;
const _registry = new Map<PlaygroundRuntimeType, RuntimeFactory>();

export function registerRuntime(type: PlaygroundRuntimeType, factory: RuntimeFactory): void {
  _registry.set(type, factory);
}

export function createRuntime(type: PlaygroundRuntimeType): PlaygroundRuntime {
  const factory = _registry.get(type);
  if (factory) return factory();
  
  // Return NoopRuntime for unregistered types (no throw)
  const label = getRuntimeLabel(type);
  return new NoopRuntime(label);
}

// Register TypeScript runtime at module load
registerRuntime("typescript", () => new TypeScriptRuntime());
registerRuntime("javascript", () => new TypeScriptRuntime()); // same runtime
```

Adding a new language later:
```ts
// In future: python-runtime.ts
import { registerRuntime } from "./runtime-registry";
registerRuntime("python", () => new PythonRuntime());
```

#### [NEW] `runtimes/noop-runtime.ts`
A placeholder runtime that returns "coming soon" output for all calls.

---

### Component: `PlaygroundToolbar.tsx`

#### [MODIFY] [PlaygroundToolbar.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundToolbar.tsx)

**ARCH-05 — Drive toolbar from `RuntimeCapabilities`**
- Replace individual `hasExercise`, `hasHints`, `onFormat`, `onToggleWordWrap` props with a single `capabilities: RuntimeCapabilities` prop.
- Each button renders based on the corresponding capability flag.
- The toolbar becomes self-adapting: add a new runtime, give it capabilities, the toolbar adjusts automatically.

---

### Component: `PlaygroundEditor.tsx`

#### [MODIFY] [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx)

**ARCH-02 — Thread `language` prop through to `highlightCode` (already done in Phase 3)**
- Ensure `language` prop (already present) is passed to the now-language-aware `highlightCode`.

---

### Future Components (Design Only — Not Implemented in Phase 4)

**ARCH-06 — `PlaygroundPreview` component (spec only)**
- Define the component interface and CSS class skeleton for a live preview panel.
- It accepts `srcDoc: string` and renders a sandboxed `<iframe>` with `allow-scripts allow-same-origin`.
- The 2-pane layout in `Playground.tsx` should check `runtime.supportsPreview` and show `PlaygroundPreview` instead of `PlaygroundOutput` when true.
- Implementation deferred until HTML/React runtime is ready.

**ARCH-07 — File tree & tabbed editor (spec only)**
- When `runtime.supportsMultipleFiles = true`, `Playground.tsx` should render a `PlaygroundFileTree` sidebar and a tabbed `PlaygroundEditorTabs` component instead of the single `PlaygroundEditor`.
- The current `code` state becomes `files: PlaygroundFile[]`.
- Implementation deferred until NestJS/React runtimes are ready.

---

## Verification Plan

### After Phase 1
- [ ] Trigger all P0 bugs manually and verify each is fixed
- [ ] Run code that previously timed out — confirm the timeout message shows the actual number (e.g. "4 seconds")
- [ ] Set `runtime="react"` — confirm a "coming soon" message appears in the output, not a crash
- [ ] Open fullscreen, navigate away — confirm page scroll is restored
- [ ] Run code with an error, expand technical details, run again — confirm technical panel collapses

### After Phase 2
- [ ] Type 50+ character line, use arrow keys — confirm cursor stays visible (EDITOR-01 fix)
- [ ] Tab-indent, Ctrl+Z — confirm undo works correctly (EDITOR-02)
- [ ] Auto-close a bracket `{`, cursor should land inside (EDITOR-03 rAF race fix)
- [ ] Scroll down, cause an error — confirm error highlight stays on the correct line (EDITOR-04)
- [ ] On mobile (< 480px) — confirm toolbar is usable without overflow
- [ ] Status bar shows correct Line/Col on every cursor move

### After Phase 3
- [ ] Type continuously for 10 seconds in a 200-line file — no lag on keystrokes (PERF-01/02)
- [ ] Hard refresh mid-exercise — confirm code is restored from localStorage (FEAT-07)
- [ ] Press F1 — shortcut cheat sheet appears
- [ ] Run code, click Stop — execution terminates immediately (FEAT-03)

### After Phase 4
- [ ] Register a mock "python" runtime using `registerRuntime` — confirm it works without any Playground.tsx change
- [ ] Confirm `RuntimeCapabilities` controls toolbar buttons correctly for both TS and mock runtimes
- [ ] Confirm `highlightCode("SELECT * FROM users", "sql")` produces SQL-colored tokens

---

## Summary Table

| Phase | Issues Resolved | Files Modified | Est. Total Effort |
|---|---|---|---|
| **Phase 1** | BUG-01–05, 07–09, 12–14, ERR-01, 03, 04, UX-06–08, IMP-07 | 6 files | ~2–3 days |
| **Phase 2** | EDITOR-01–06, PERF-01, 03, 04, 07, UX-02, 05, 12, FEAT-03, 04, IMP-03, ERR-06 | 5 files + CSS | ~3–4 days |
| **Phase 3** | PERF-02, 05, IMP-01, 02, 04, 05, FEAT-01, 07, 08, ARCH-02, 03 | 5 files | ~3–4 days |
| **Phase 4** | ARCH-01, 04, 05, 06, 07 | 4 files + 1 new | ~2 days |
| **Total** | 34 issues | ~15 files | **~10–13 days** |
