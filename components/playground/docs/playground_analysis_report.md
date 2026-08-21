# 🔬 LearnCraft Playground — Full Analysis Report

> **Scope:** Every file in `components/playground/` was read in full.
> **Goal:** Identify all bugs, UX problems, architectural weaknesses, and improvement opportunities before any implementation begins.

---

## 📋 Table of Contents

1. [Existing Bugs & Technical Issues](#1-existing-bugs--technical-issues)
2. [Editor, Cursor, Scrolling & Keyboard Navigation Problems](#2-editor-cursor-scrolling--keyboard-navigation-problems)
3. [UI/UX Issues](#3-uiux-issues)
4. [Performance & Responsiveness Issues](#4-performance--responsiveness-issues)
5. [Missing Error Handling & Feedback](#5-missing-error-handling--feedback)
6. [Features That Should Be Improved](#6-features-that-should-be-improved)
7. [New Features That Would Add Value](#7-new-features-that-would-add-value)
8. [Multi-Language Architecture Improvements](#8-multi-language-architecture-improvements)
9. [Prioritized Action Plan](#9-prioritized-action-plan)

---

## 1. Existing Bugs & Technical Issues

### 🔴 Critical

#### BUG-01 — `handleCheck` double-runs the runtime and double-sets `isRunning`
**File:** [`Playground.tsx` L163–L217](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L163-L217)

`handleCheck` calls `setIsRunning(true)` at line 188, then calls `await rt.run(...)` at line 203 **after** `rt.validate()` already completed. But if `rt.validate` is absent it calls `await handleRun()` at line 207, which itself calls `setIsRunning(true)` a second time with no guard, and then **`setIsRunning(false)` in handleCheck's finally** fires before `handleRun`'s own finally fires. This causes the running spinner to flash off prematurely and leaves state inconsistent.

```
// In handleCheck:
await handleRun();         // <-- handleRun sets isRunning=true inside, then false in finally
// Then handleCheck's finally fires: setIsRunning(false)  ← already false, no-op, BUT...
// the order of React batching means there is a window where isRunning=false while code still runs
```

#### BUG-02 — `postMessage` listener never validates the `origin`
**File:** [`typescript-runtime.ts` L666, L949](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/typescript-runtime.ts#L666)

Both iframe execution paths use `window.addEventListener("message", handleMessage)` with no `event.origin` check. Any other script or cross-origin frame on the page can post a fake `playground-done` message and resolve the Promise early (or forge output).

```ts
// ⚠️ Missing: if (event.source !== iframe.contentWindow) return;
const handleMessage = (event: MessageEvent) => {
  const data = event.data;  // NO origin validation
```

#### BUG-03 — `postMessage` inside the sandboxed iframe uses `'*'` as the target origin
**File:** [`typescript-runtime.ts` L317](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/typescript-runtime.ts#L317)

```js
window.parent.postMessage({ ... }, '*');
```
This broadcasts to every listening window. On a page with other embedded iframes or analytics scripts this could leak user code output. Should use `window.location.origin`.

#### BUG-04 — The timeout string in the iframe HTML is not interpolated correctly
**File:** [`typescript-runtime.ts` L359](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/typescript-runtime.ts#L359)

```ts
message: 'Execution timed out after ${timeLimit / 1000} seconds...'
// ↑ single quotes → template literal NOT evaluated → literal "${timeLimit / 1000}" shown to user
```
The string uses **single quotes** instead of backticks, so the user always sees the literal text `${timeLimit / 1000}` rather than the actual number.

#### BUG-05 — `buildValidationHtml` re-transpiles the already-transpiled code
**File:** [`typescript-runtime.ts` L418, L952](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/typescript-runtime.ts#L418-L952)

In the iframe validation path: `buildValidationHtml(input.code, ...)` calls `buildSandboxHtml(fullCode, ...)` which calls `transpileTypeScriptLocally(fullCode)` again — but `fullCode` at this point already contains the transpiled code concatenated with the raw test code snippets. Double-transpilation can corrupt variable names and produce incorrect JS.

#### BUG-06 — Regex-based fallback transpiler breaks on complex generics and multi-line type aliases
**File:** [`typescript-runtime.ts` L151–L269](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/typescript-runtime.ts#L151-L269)

Step 2 removes type aliases with the regex `/type\s+...\s*=[\s\S]*?;/g`. This regex is greedy and does **not** account for nested generics, union types spanning multiple lines with embedded semicolons, or `type Fn = () => { x: number };`. It can delete entire valid code blocks.

Step 7 (function parameter cleaning regex) uses `[\s\S]*?` inside `(...)` which can catastrophically fail on deeply nested arrow functions in parameter lists — it's not parenthesis-aware.

#### BUG-07 — `ratio2` state closure stale in `startResizing3Pane`
**File:** [`Playground.tsx` L336–L393](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L336-L393)

`startResizing3Pane` closes over `ratio1` (in the dependency array) but **not `ratio2`**. When resizer 2 is dragged, the calculation `Math.min(100 - ratio1 - 15, ...)` uses a potentially stale `ratio1` value from the time the drag started, causing the third panel to jump or shrink incorrectly if resizer 1 was moved in the same session.

#### BUG-08 — `handleReset` in 3-pane mode clears practiceCode but runtime state is not reset
**File:** [`Playground.tsx` L219–L230](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L219-L230)

In 3-pane mode, `handleReset` calls `setPracticeCode("")` and then `getRuntime().reset()`. But the runtime's `reset()` only destroys the iframe. The previous Worker thread (if still running) is NOT terminated. If a user clicks Reset while code is still running in a Worker, the Worker continues and can post messages back to the output panel after the reset.

---

### 🟡 Medium

#### BUG-09 — `document.execCommand("copy")` is deprecated
**File:** [`Playground.tsx` L245](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L245), [`PlaygroundExamplePanel.tsx` L34](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundExamplePanel.tsx#L34)

`document.execCommand("copy")` is deprecated in modern browsers. The clipboard fallback silently fails in some environments (Chromium 127+). Should use a text-input fallback with `window.prompt()` or simply show the user the text to manually copy.

#### BUG-10 — `PlaygroundOutput` has a permanently stale `showTechnical` toggle
**File:** [`PlaygroundOutput.tsx` L24](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundOutput.tsx#L24)

`showTechnical` is local component state but it never resets when `error` changes. If the user runs code, opens the technical error, then runs again with a different error, the technical detail of the **new** error is already expanded — or worse, the previous error's expanded state persists.

#### BUG-11 — The `while`-loop guard doesn't protect `for` loops or recursion
**File:** [`typescript-runtime.ts` L264–L267](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/typescript-runtime.ts#L264-L267)

Only `while` loops get a guard. A `for(;;) {}` or a deeply recursive function will still cause the Worker/tab to hang until the 4-second timeout fires, giving zero feedback during that wait.

#### BUG-12 — `PlaygroundProps` includes `minHeight` in the interface but the component never uses it
**File:** [`types.ts` L131](file:///f:/My%20Projects/LearnCraft/components/playground/types.ts#L131), [`Playground.tsx` L41](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L41)

`minHeight` is declared in `PlaygroundProps` but is **not destructured** in the `Playground` function signature. The prop is silently discarded.

#### BUG-13 — `PlaygroundFullscreen` leaks `document.body.style.overflow = "hidden"` on page navigation
**File:** [`PlaygroundFullscreen.tsx` L31–L34](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundFullscreen.tsx#L31-L34)

The cleanup only runs inside the `if (isOpen)` block. If the component unmounts while `isOpen = true` (e.g. user navigates away), the cleanup function is never registered and `document.body.style.overflow` stays `"hidden"` permanently.

#### BUG-14 — `PlaygroundExamplePanel` accepts a `language` prop but immediately renames it `_language` (unused)
**File:** [`PlaygroundExamplePanel.tsx` L16](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundExamplePanel.tsx#L16)

The `_language` prefix means it's intentionally unused, but `highlightCode(code)` on L107 is called **without** the language argument — the highlighter defaults to TypeScript regardless of what language is set.

---

## 2. Editor, Cursor, Scrolling & Keyboard Navigation Problems

### 🔴 Critical

#### EDITOR-01 — `CHAR_WIDTH_PX = 7.82` is hardcoded — guaranteed to be wrong
**File:** [`PlaygroundEditor.tsx` L33](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L33)

The horizontal cursor scroll uses a fixed `7.82px` character width for "13px SF Mono / Cascadia Code". But:
- Actual rendered font differs by OS, browser, DPI, and font loading order
- User's system may not have either of those fonts installed
- Different characters have different widths (monospace ≠ truly fixed-width in all contexts)

Result: On any non-Mac or scaled DPI display, the horizontal cursor position is wrong. Long lines cause the viewport to over-scroll or under-scroll, hiding the cursor behind the edge.

#### EDITOR-02 — Undo history is not integrated with the `onChange` React handler
**File:** [`PlaygroundEditor.tsx` L611–L624](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L611-L624)

`handleChange` (fired by React's `onChange` on the textarea) **never pushes to `undoStackRef`**. Only `applyTextEdit` does. This means every character typed by the user through normal typing is NOT undo-able through the custom undo system — the browser's native undo handles these. But when `applyTextEdit` is called (auto-close, Tab indent, Enter, etc.), it clears `redoStackRef`, which wipes the browser's native redo too. The two undo systems interfere: you can get into a state where Ctrl+Z partially restores text and then jumps back much further than expected.

#### EDITOR-03 — `requestAnimationFrame` inside `applyTextEdit` races with React re-renders
**File:** [`PlaygroundEditor.tsx` L218–L226](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L218-L226)

`applyTextEdit` calls `onChange(newFullValue)` to lift state, then schedules a `requestAnimationFrame` to set `textarea.selectionStart/End`. Between the `onChange` call and the rAF callback, React may re-render the component and reset the textarea's cursor independently — causing the cursor to jump to the wrong position after auto-close bracket insertion or Tab indent.

#### EDITOR-04 — Scroll sync uses `translateY` for the error highlight but `scrollTop` for everything else
**File:** [`PlaygroundEditor.tsx` L128](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L128)

```ts
errorHighlightRef.current.style.transform = `translateY(-${top}px)`;
```
This CSS transform approach only works if `errorHighlightRef` is a child of a non-scrolling container. But when `isFullscreen` changes or the pane is resized, `top` can become stale. The highlight band drifts off the actual error line when the editor has been scrolled and then resized.

#### EDITOR-05 — `handleKeyDown` uses `e.currentTarget` instead of `textareaRef`
**File:** [`PlaygroundEditor.tsx` L306–L309](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L306-L309)

```ts
const textarea = e.currentTarget;
const domValue = textarea.value;
```
`e.currentTarget` is the correct element during a synchronous event handler, but the same `textarea` reference is used across multiple async callbacks created by closures inside `handleKeyDown`. If React ever changes event pooling behavior (or in React 17 noop mode), this can return a nulled-out synthetic event. Using `textareaRef.current` directly is safer and more explicit.

### 🟡 Medium

#### EDITOR-06 — No keyboard shortcut to jump to a specific line number
There's no Ctrl+G / Ctrl+L "Go to Line" shortcut. When an error says "Error on Line 47", users must manually count or scroll to find it.

#### EDITOR-07 — Tab indentation is always 2 spaces — not configurable
The indent width is hardcoded to `"  "` (2 spaces) throughout `handleKeyDown` (Tab, Shift+Tab, Enter). Some learners or languages (SQL, Prisma) prefer 4 spaces or tabs.

#### EDITOR-08 — `Ctrl+D` (Duplicate Line) conflicts with browser bookmark shortcut on some browsers
`Ctrl+D` opens "Add to bookmarks" in Chrome by default. The `e.preventDefault()` call suppresses the bookmark dialog, but this is a surprising override for users who accidentally hit it.

#### EDITOR-09 — `ArrowKey` handler calls `closeSuggestions()` unconditionally
**File:** [`PlaygroundEditor.tsx` L368–L375](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L368-L375)

Arrow keys always close the autocomplete popover. But `handleAutocompleteKeyDown` (called first at L272) should already intercept Up/Down arrows when the popup is open. If `intercepted` is false (popup closed), calling `closeSuggestions()` is a no-op. If `intercepted` is true, the return at L273 prevents reaching L368. The double-handling is harmless but confusing.

#### EDITOR-10 — Smart Enter only handles `{...}` — not `[...]` or `(...)`
**File:** [`PlaygroundEditor.tsx` L577–L594](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L577-L594)

Pressing Enter between `[` and `]` or `(` and `)` does not expand them to multiple lines with proper indentation. Only `{` and `}` get the smart expansion. Arrays and function argument lists are left on one line.

---

## 3. UI/UX Issues

#### UX-01 — No visual indicator that the playground is ready to type
On initial mount, the editor shows a placeholder. But there is no focus ring or cursor blink on load. Users don't know they can click and start typing immediately — especially beginners.

#### UX-02 — "Run" button uses `disabled={isRunning}` but gives no reason why it's disabled
**File:** [`PlaygroundToolbar.tsx` L45](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundToolbar.tsx#L45)

The button is disabled but the tooltip still says "Run code (Ctrl+Enter)". There is no tooltip update to say "Code is currently running…" The button just goes grey with no explanation.

#### UX-03 — Mode toggle ("3 Panes / 2 Panes") only appears in fullscreen — invisible in normal mode
**File:** [`Playground.tsx` L437–L454](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L437-L454)

In normal (non-fullscreen) mode the user has no idea the 3-pane layout even exists. There's no teaser or prompt like "Go fullscreen for Practice Mode".

#### UX-04 — Resizing 3-pane layout can collapse the output panel to near-zero width
**File:** [`Playground.tsx` L352–L358](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L352-L358)

The output panel width is `100 - ratio1 - ratio2`. With clamps of `ratio1 ≤ 50` and `ratio2 ≤ 100 - ratio1 - 15`, a user can push both resizers to the right and reduce the output panel to `15%` — but the clamp logic has the race condition from BUG-07, so the actual minimum is not reliably enforced.

#### UX-05 — The copy toast (`✓ Copied!`) position is not anchored to the Copy button
**File:** [`PlaygroundToolbar.tsx` L147–L149](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundToolbar.tsx#L147-L149)

The toast `<div className="playground-toast">` floats in the toolbar but has no `position: absolute` relative to the Copy button. On narrow screens it can overlap other toolbar buttons.

#### UX-06 — `hintsUsed` counter in the toolbar never reflects actual revealed hints
**File:** [`Playground.tsx` L252–L256](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L252-L256), [`PlaygroundHints.tsx` L16](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundHints.tsx#L16)

`hintsUsed` in `Playground.tsx` increments every time the Hint **button** is clicked (and caps at total hints). But `PlaygroundHints` has its own internal `revealedCount` that resets to 0 whenever `showHints` is toggled. So the toolbar counter and the actual hint reveals are out of sync after the hints panel is closed and reopened.

#### UX-07 — No confirmation before "Apply Solution to Editor" overwrites user's work
**File:** [`PlaygroundHints.tsx` L72–L80](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundHints.tsx#L72-L80)

Clicking "Apply Solution to Editor" immediately replaces the user's code with no undo warning. The user can lose their entire attempt silently.

#### UX-08 — No confirmation before "Reset" in the toolbar overwrites user's work
**File:** [`PlaygroundToolbar.tsx` L110–L119](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundToolbar.tsx#L110-L119)

Same as above: one click on Reset clears all written code with no prompt.

#### UX-09 — Exercise Instructions panel is completely hidden in 3-pane mode
**File:** [`Playground.tsx` L457, L473](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L457-L473)

When `is3PaneMode` is true, the exercise title/instructions block at the top is hidden. The instructions are shown in the example panel's side box instead — but only if `exercise` is provided. If no exercise is set (standalone playground), the 3-pane mode provides no context at all about what the panels are for.

#### UX-10 — Output panel is titled "Console" but also shows test results mixed in
The output panel header always says "Console" regardless of whether it's showing run output, test failures, or errors. Test results panel (`PlaygroundTests`) appears below the main body, not inside the console — which creates a disconnected layout.

#### UX-11 — No line count or character count shown anywhere
Beginners editing large files have no sense of their position. No "Line X, Col Y" status bar exists.

#### UX-12 — The fullscreen close button (✕) has no keyboard focus trap
**File:** [`PlaygroundFullscreen.tsx` L42–L53](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundFullscreen.tsx#L42-L53)

When the fullscreen overlay opens, focus is not moved to the overlay. A screen reader or keyboard user can tab through elements behind the overlay. Accessible modals must trap focus within the overlay.

---

## 4. Performance & Responsiveness Issues

#### PERF-01 — `highlightCode(value, cursorOffset)` runs on **every keystroke and scroll sync**
**File:** [`PlaygroundEditor.tsx` L722](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L722)

The syntax highlighter is called directly in JSX with no memoization:
```tsx
{highlightCode(value, cursorOffset)}
```
This re-runs the full highlighting algorithm every render — including renders triggered by `cursorOffset` state changes (which happen on every click/keypress). For large files this will cause noticeable lag on every cursor move.

#### PERF-02 — `parseCodeScope` in the autocomplete hook runs on every keystroke
**File:** [`use-autocomplete.ts`](file:///f:/My%20Projects/LearnCraft/components/playground/autocomplete/use-autocomplete.ts)

The autocomplete hook fully re-parses the entire code (including class extraction with balanced brace search, instance map building, etc.) every time the value changes. For a 300-line file this is an O(n²) operation on every character typed, with no debounce or memoization.

#### PERF-03 — `Array.from({ length: lineCount })` creates a new array every render for line numbers
**File:** [`PlaygroundEditor.tsx` L676](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L676)

```tsx
{Array.from({ length: lineCount }, (_, i) => { ... })}
```
A new array is allocated for each render. Combined with PERF-01, every cursor move creates new arrays for both highlighting and line numbers.

#### PERF-04 — `syncScrollLayers` is called from multiple sources redundantly in sequence
**File:** [`PlaygroundEditor.tsx` L218–L226](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L218-L226)

Inside `applyTextEdit`, after `onChange(newFullValue)`:
1. The `useLayoutEffect` fires (line 249) and calls `syncScrollLayers()`
2. The `requestAnimationFrame` fires and calls `scrollCursorIntoView()` which calls `syncScrollLayers()` again
3. The native `scroll` event listener also fires and calls `syncScrollLayers()`

This means `syncScrollLayers()` can run 3+ times in rapid succession for a single edit — unnecessary DOM reads and writes on every keystroke.

#### PERF-05 — The `suggestion-data.ts` file is 40KB of static data loaded eagerly
**File:** [`autocomplete/suggestion-data.ts`](file:///f:/My%20Projects/LearnCraft/components/playground/autocomplete/suggestion-data.ts) (40,733 bytes)

The entire TypeScript/JavaScript suggestion dataset is imported synchronously at module load time. This increases the initial JavaScript bundle by ~40KB and is parsed immediately, even for users who never interact with autocomplete.

#### PERF-06 — Mobile/touch performance: no `passive: true` on `touchmove` in 3-pane resizer cleanup
**File:** [`Playground.tsx` L383](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L383)

The 2-pane resizer correctly registers `{ passive: true }` on `touchmove` (line 315), but the 3-pane resizer's cleanup `removeEventListener` at line 383 does not match the passive flag. Mismatched add/remove options can cause the listener to not be properly removed in some browsers.

#### PERF-07 — No viewport/responsive breakpoints for the toolbar
On narrow screens (< 480px), the toolbar renders all buttons in a row with overflow. There's no hamburger menu or collapsible toolbar. The buttons overflow off-screen on mobile.

---

## 5. Missing Error Handling & Feedback

#### ERR-01 — No user-visible error when `createRuntime` throws for unsupported language
**File:** [`Playground.tsx` L72–L77](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L72-L77)

```ts
const getRuntime = useCallback((): IPlaygroundRuntime => {
  if (!runtimeRef.current) {
    runtimeRef.current = createRuntime(runtimeType);  // ← throws for unsupported types
  }
  return runtimeRef.current;
}, [runtimeType]);
```
If `runtimeType` is set to `"react"` or `"html"`, `createRuntime` throws. This throw propagates up to `handleRun`'s `catch` block, which shows a generic "An unexpected error occurred" message. The user gets no explanation that the runtime is not yet supported.

#### ERR-02 — Worker `onerror` only receives a `MessageEvent` with limited info
**File:** [`typescript-runtime.ts` L585–L601](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/typescript-runtime.ts#L585-L601)

When a Worker fails to load (e.g. CSP blocks `blob:` URLs), `worker.onerror` fires but `err.message` may be empty or generic. The user sees "Worker error" with no actionable info. There's no fallback message like "Execution sandbox unavailable, check your browser's Content Security Policy".

#### ERR-03 — Transpiler silently returns malformed JS on edge cases
**File:** [`typescript-runtime.ts` L130–L270](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/typescript-runtime.ts#L130-L270)

When `ts.transpileModule` fails (catch block at L144), the code falls through to the regex fallback silently. If the regex fallback also produces incorrect JS, `new AsyncFunction(jsCode)` throws — but the error message will reference generated JS line numbers, not the original TypeScript line numbers, confusing the user.

#### ERR-04 — `handleCheck` doesn't show any output lines when validation succeeds
**File:** [`Playground.tsx` L200–L205](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L200-L205)

When `rt.validate` passes, `rt.run` is called and its output is shown. But if `rt.run` produces no console output (e.g., the user's code is just a class definition), the output panel stays empty. The user only gets the test results panel — with no "Your code ran successfully" confirmation in the console.

#### ERR-05 — No timeout feedback during the 4-second wait
When code is running slowly, the only feedback is the spinning dots + "Running..." text. There's no countdown, no "still running…" message at the 2-second mark, and no way to cancel execution early.

#### ERR-06 — `PlaygroundHints` has no state persistence across mode switches
When the user switches from 2-pane to 3-pane mode, `showHints` remains true in `Playground.tsx` state, but `PlaygroundHints` mounts fresh in the new layout — resetting `revealedCount` to 0. The user loses their hint progress without any warning.

---

## 6. Features That Should Be Improved

#### IMP-01 — Code formatter is regex-based and breaks on complex TypeScript
**File:** [`code-formatter.ts`](file:///f:/My%20Projects/LearnCraft/components/playground/code-formatter.ts)

The formatter:
- Counts `{`, `[`, `(` naively **even inside strings and placeholders** (L94–L100) — the placeholder substitution happens after the brace counting, so the counts are wrong for string-heavy code.
- Cannot handle ternary operators, JSX, decorators, or `as const` assertions.
- `case` indent is calculated as `indentLevel - 0.5` which produces `Math.floor(0.5) = 0` — `case` and the surrounding `switch` body end up at the same indent level.

#### IMP-02 — Autocomplete is purely prefix-based — no fuzzy matching
**File:** [`use-autocomplete.ts`](file:///f:/My%20Projects/LearnCraft/components/playground/autocomplete/use-autocomplete.ts)

The popover only shows suggestions that **start with** the current prefix. Typing `mth` won't suggest `Math`, `prnt` won't suggest `println`. Modern editors use subsequence/fuzzy matching.

#### IMP-03 — Autocomplete popover has no maximum height limit in CSS → overflows viewport
**File:** [`autocomplete/AutocompletePopover.tsx`](file:///f:/My%20Projects/LearnCraft/components/playground/autocomplete/AutocompletePopover.tsx)

If many suggestions are returned, the popover can extend past the bottom of the screen with no scroll. Need `max-height` + `overflow-y: auto`.

#### IMP-04 — Syntax highlighter `highlightCode` does not accept a language parameter
**File:** [`syntax-highlighter.tsx`](file:///f:/My%20Projects/LearnCraft/components/playground/syntax-highlighter.tsx)

The function signature is `highlightCode(code, cursorOffset?)` with no language. It always highlights as TypeScript/JS. When future languages (SQL, HTML, CSS) are added, the highlighter will need to be language-aware.

#### IMP-05 — `PlaygroundExercise.timeLimit` is defined in types but never used
**File:** [`types.ts` L93](file:///f:/My%20Projects/LearnCraft/components/playground/types.ts#L93), [`Playground.tsx`](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx)

The `timeLimit` field on exercises is never passed to `rt.run()` or `rt.validate()`. All executions use the hardcoded 4000ms Worker timeout and 5000ms iframe timeout, ignoring any per-exercise configuration.

#### IMP-06 — The runtime registry throws on unsupported runtimes instead of gracefully degrading
**File:** [`runtime-registry.ts` L31–L37](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/runtime-registry.ts#L31-L37)

Throwing an error means the runtime is never assigned and `runtimeRef.current` stays `null`. A better pattern is to return a `NoopRuntime` that shows a "Coming Soon" message in the output panel.

#### IMP-07 — `handleCopy` in 3-pane mode copies `practiceCode || exampleCode` — fallback is unexpected
**File:** [`Playground.tsx` L234](file:///f:/My%20Projects/LearnCraft/components/playground/Playground.tsx#L234)

If `practiceCode` is empty, Copy silently copies the example code instead. The user clicking Copy expects their practice code (even if empty). This silent fallback creates confusion.

---

## 7. New Features That Would Add Value

#### FEAT-01 — **Execution History / Output Log**
Keep a scrollable log of all past runs in the session (with timestamps). Currently every Run clears the previous output — users lose earlier results they may want to compare.

#### FEAT-02 — **"Share" / Permalink for code snippets**
Allow users to share a playground state via URL (using URL-safe base64 or a short code service). Essential for learners asking for help.

#### FEAT-03 — **Cancel/Stop execution button**
Once code starts running, the Run button goes grey. Users should be able to click a "Stop" button that terminates the Worker immediately, without waiting for the 4-second timeout.

#### FEAT-04 — **Line/Column status bar**
Show current cursor line and column in a status bar below the editor. Paired with a "Go to Line" (Ctrl+G) shortcut. Critical for navigating to errors.

#### FEAT-05 — **Multiple test case runs with per-case timing**
`PlaygroundTests` shows pass/fail but no per-test execution time. Showing how long each test took helps learners optimize their algorithms.

#### FEAT-06 — **Code diff view between starter code and current code**
After solving an exercise, show a side-by-side or unified diff between the starter/solution and the user's attempt. Helps learners understand where they diverged.

#### FEAT-07 — **Persistent state between page reloads** (localStorage)
If a user refreshes mid-exercise, all their work is lost. Auto-saving to `localStorage` keyed by exercise ID would prevent this.

#### FEAT-08 — **Keyboard shortcut cheat-sheet overlay**
A Ctrl+? or F1 shortcut that shows all available shortcuts (Ctrl+Enter, Shift+Alt+F, Alt+Z, Ctrl+/, Ctrl+D, etc.) in a modal. Currently the only discovery mechanism is `title` attributes on buttons.

#### FEAT-09 — **Console input (stdin simulation)**
For exercises that teach `prompt()` or reading from stdin, support a simulated input field so users can provide runtime inputs without modifying their code.

#### FEAT-10 — **Output search / filter**
For programs with lots of output, allow filtering lines by type (log/warn/error) or by text content.

---

## 8. Multi-Language Architecture Improvements

The current architecture has a good foundation (`PlaygroundRuntime` interface, runtime registry) but several changes are needed before adding new languages without breaking the UI.

#### ARCH-01 — `PlaygroundRuntime` interface must be extended with metadata
**File:** [`types.ts` L96–L121](file:///f:/My%20Projects/LearnCraft/components/playground/types.ts#L96-L121)

Add:
```ts
interface PlaygroundRuntime {
  // existing...
  language: PlaygroundRuntimeType;
  displayName: string;
  fileExtension: string;       // ".ts", ".sql", ".html"
  supportsLivePreview: boolean; // renamed from supportsPreview for clarity
  supportsStdin: boolean;
  defaultTimeout: number;       // per-language execution timeout
  monacoLanguageId?: string;    // for future Monaco integration
}
```

#### ARCH-02 — Syntax highlighter must be language-dispatching, not TypeScript-only
**File:** [`syntax-highlighter.tsx`](file:///f:/My%20Projects/LearnCraft/components/playground/syntax-highlighter.tsx)

```ts
// Current: highlightCode(code, cursorOffset?)
// Needed:  highlightCode(code, language, cursorOffset?)
```
The language must be threaded through to enable per-language token coloring (SQL keywords differ from TS keywords).

#### ARCH-03 — Autocomplete suggestion data must be lazy-loaded per language
**File:** [`autocomplete/suggestion-data.ts`](file:///f:/My%20Projects/LearnCraft/components/playground/autocomplete/suggestion-data.ts)

Refactor to:
```ts
async function getSuggestionsForLanguage(language: string): Promise<AutocompleteSuggestion[]>
```
Each language's data file should be a dynamic import loaded only when first needed.

#### ARCH-04 — Runtime registry should use a registration pattern, not a switch statement
**File:** [`runtime-registry.ts` L25–L38](file:///f:/My%20Projects/LearnCraft/components/playground/runtimes/runtime-registry.ts#L25-L38)

```ts
// Current:
switch (type) {
  case "typescript": return new TypeScriptRuntime();
  default: throw new Error("...");
}

// Recommended:
const registry = new Map<PlaygroundRuntimeType, () => PlaygroundRuntime>();
registry.set("typescript", () => new TypeScriptRuntime());
// Adding Python later = just registry.set("python", () => new PythonRuntime())
// No switch statement modification required
```

#### ARCH-05 — The toolbar must be driven by runtime capabilities, not hardcoded conditions
**File:** [`PlaygroundToolbar.tsx`](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundToolbar.tsx)

The Format button, Check button, Word Wrap, etc. are controlled by prop booleans. As languages are added, this list will grow with more booleans. Instead, define a `RuntimeCapabilities` object from the runtime and derive toolbar rendering from it:

```ts
interface RuntimeCapabilities {
  canFormat: boolean;        // TypeScript: yes, SQL: basic, HTML: yes
  canWordWrap: boolean;      // All: yes
  canCheck: boolean;         // exercise mode only
  canPreview: boolean;       // HTML/React
  canShareLink: boolean;     // always
}
```

#### ARCH-06 — Preview panel for HTML/React is completely undesigned
When `supportsPreview = true` is set on a future runtime, there's no `PlaygroundPreview` component or CSS class to render a live preview iframe. This needs to be designed now so the 2-pane layout can switch between "editor | console" and "editor | preview" modes.

#### ARCH-07 — Multi-file support (`PlaygroundFile[]`) is typed but has no UI implementation
**File:** [`types.ts` L36–L40](file:///f:/My%20Projects/LearnCraft/components/playground/types.ts#L36-L40)

`PlaygroundFile` and `PlaygroundInput.files` are defined but nothing in the editor or runtime actually handles multiple files. For NestJS or React projects this is essential. A file tree panel and tabbed editor must be planned before those runtimes are added.

#### ARCH-08 — Code formatter is language-unaware
**File:** [`code-formatter.ts` L29](file:///f:/My%20Projects/LearnCraft/components/playground/code-formatter.ts#L29)

```ts
export function formatCodeWithCursor(
  code: string,
  cursorOffset: number = 0,
  _language: string = "typescript"   // ← language is accepted but prefixed with _ (unused!)
```
The `_language` parameter is silently ignored. For SQL, HTML, CSS, or Prisma schema, completely different formatting rules apply.

---

## 9. Prioritized Action Plan

| Priority | ID | Issue | Effort |
|---|---|---|---|
| 🔴 P0 | BUG-04 | Timeout string not interpolated (shows raw `${...}`) | XS |
| 🔴 P0 | BUG-02/03 | postMessage missing origin validation (security) | S |
| 🔴 P0 | BUG-01 | double-run/double-isRunning in handleCheck | S |
| 🔴 P0 | EDITOR-01 | Hardcoded CHAR_WIDTH_PX breaks horizontal scroll on most systems | M |
| 🔴 P0 | PERF-01 | highlightCode runs on every cursor move with no memoization | S |
| 🟡 P1 | BUG-05 | Double-transpilation in validation iframe path | S |
| 🟡 P1 | BUG-07 | Stale ratio1 closure in 3-pane resizer | S |
| 🟡 P1 | BUG-08 | Worker not terminated on Reset | S |
| 🟡 P1 | BUG-10 | showTechnical state never resets between errors | XS |
| 🟡 P1 | BUG-13 | body overflow not restored on unmount while fullscreen | S |
| 🟡 P1 | EDITOR-02 | Custom undo clashes with browser native undo | L |
| 🟡 P1 | EDITOR-03 | rAF cursor set races with React re-render | M |
| 🟡 P1 | UX-06 | hintsUsed counter out of sync with revealed hints | S |
| 🟡 P1 | UX-07/08 | No confirmation before Apply Solution / Reset | S |
| 🟡 P1 | ERR-01 | Unsupported runtime crashes without user-friendly message | S |
| 🟡 P1 | ERR-05 | No cancel button / no progress during 4s timeout | M |
| 🟠 P2 | IMP-01 | Formatter brace counting runs inside strings | M |
| 🟠 P2 | IMP-04 | Syntax highlighter has no language param | M |
| 🟠 P2 | PERF-02 | parseCodeScope not debounced — O(n²) on every keystroke | M |
| 🟠 P2 | PERF-05 | 40KB suggestion-data loaded eagerly | M |
| 🟠 P2 | UX-12 | Fullscreen has no focus trap (accessibility) | S |
| 🟠 P2 | FEAT-03 | Stop/Cancel execution button | M |
| 🟠 P2 | FEAT-04 | Line/Column status bar + Go to Line shortcut | M |
| 🟠 P2 | FEAT-07 | Auto-save to localStorage | S |
| 🔵 P3 | ARCH-04 | Registry pattern instead of switch statement | S |
| 🔵 P3 | ARCH-01 | Extend PlaygroundRuntime interface with metadata | S |
| 🔵 P3 | ARCH-02 | Language-aware syntax highlighter | L |
| 🔵 P3 | ARCH-03 | Lazy-load suggestion data per language | M |
| 🔵 P3 | ARCH-05 | Toolbar driven by runtime capabilities object | M |
| 🔵 P3 | FEAT-01 | Execution history / output log | M |
| 🔵 P3 | FEAT-02 | Share / permalink | L |
| 🔵 P3 | FEAT-08 | Keyboard shortcut cheat sheet (F1/Ctrl+?) | S |

> **Legend:** XS = < 1hr, S = 1–3hrs, M = 3–8hrs, L = 1–3 days

---

*Report generated from full read of all 15 playground files (13 source files + 2 subdirectories). No changes were made to the codebase.*
