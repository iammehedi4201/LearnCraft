# Fix All Playground Editor Issues — Complete Analysis

Exhaustive audit of every file in the Playground Editor system. **12 issues** found — the 3 user-reported plus 9 additional problems that degrade the editing experience.

## Complete Issue Inventory

### 🔴 User-Reported Issues (Critical)

| # | Issue | File | Root Cause |
|---|-------|------|------------|
| 1 | **ArrowUp/ArrowDown broken past ~30 lines** | [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L206-L212) | The textarea's visual height is bounded by its CSS container (`height: 100%`), but `scrollCursorIntoView()` calculates pixel positions using hardcoded `lineHeight = 26` and `paddingTop = 14`. When content overflows, the calculated `cursorTop` diverges from reality because it doesn't account for the actual rendered state. The highlight and line-number layers also don't track the scroll, causing compound visual desync. |
| 2 | **Mouse click position ≠ typing position** | [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L488-L516) + [playground.css](file:///f:/My%20Projects/LearnCraft/components/playground/playground.css#L250-L299) | The textarea (transparent text, z-index:2) and syntax highlight `<pre>` overlay (z-index:1) have **mismatched overflow behavior**. The textarea has `overflow-y: auto` (scrolls), but the `<pre>` has `overflow: hidden` (clips). After scrolling, the highlight text positions no longer match the textarea character positions — the user sees the highlighted text at position X but the textarea cursor is at position Y. |
| 3 | **No auto-scroll at viewport bottom** | [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L96-L146) | `scrollCursorIntoView()` has correct logic structure but the hardcoded pixel constants (`lineHeight=26`, `paddingTop=14`) don't match across all container contexts (normal, fullscreen, 3-pane). The bottom padding `5rem` (80px) in CSS provides some buffer, but the scroll calculation's `verticalBuffer=52` (2 lines) is insufficient — it should be at least 3-4 lines. |

### 🟡 Additional Issues Found (Important)

| # | Issue | File | Root Cause |
|---|-------|------|------------|
| 4 | **ArrowLeft/ArrowRight block cross-line navigation** | [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L176-L204) | Lines 176-203 call `e.preventDefault()` when ArrowLeft is at line start or ArrowRight is at line end. This **breaks standard textarea behavior** — normally, left at line start moves to previous line's end, and right at line end moves to next line's start. This traps the cursor on each line, making horizontal navigation feel broken. |
| 5 | **Highlight `<pre>` layer scroll desync** | [playground.css](file:///f:/My%20Projects/LearnCraft/components/playground/playground.css#L250-L271) | The highlight layer has `overflow: hidden`, so `scrollTop`/`scrollLeft` assignments in JS have no effect — the browser silently ignores them. The highlight content is simply clipped, not scrolled. It needs `overflow: hidden` but its JS sync must use `transform: translate()` instead of `scrollTop`, OR it needs to also be `overflow: auto` with scrollbar hidden. |
| 6 | **Line numbers don't scroll** | [playground.css](file:///f:/My%20Projects/LearnCraft/components/playground/playground.css#L166-L181) | Same as #5: `overflow: hidden` means `scrollTop` assignments are no-ops. The line numbers need to either use `overflow-y: auto` (with scrollbar hidden via CSS) or use `transform` to simulate scrolling. |
| 7 | **`cursorOffset` state race condition** | [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L369-L402) | `syncCursorPos()` reads `selectionStart` synchronously, but React's controlled component cycle may have already reset the cursor position. In `handleChange` this causes stale cursor offsets, making bracket pair highlighting flash on wrong brackets. Should defer cursor reading to `requestAnimationFrame`. |
| 8 | **Undo/Redo broken** | [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L377-L386) | The editor uses React controlled state (`value={value}` + `onChange`). Every custom keystroke handler calls `onChange(newValue)` which replaces the entire textarea value through React state — this **destroys the browser's native undo stack**. Ctrl+Z does nothing after using Tab, Enter, or bracket auto-close. This is a fundamental issue with the controlled textarea + imperative value replacement pattern. Fix: use `document.execCommand('insertText')` for supported modifications, or implement a custom undo stack. |
| 9 | **No Shift+Tab dedent** | [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L306-L317) | Tab inserts 2 spaces, but Shift+Tab does nothing. Users expect Shift+Tab to remove indentation (2 spaces from line start). This is a standard editor feature that's missing. |
| 10 | **No Ctrl+D duplicate line** | [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L148-L367) | Missing standard editor shortcut. Ctrl+D (or Ctrl+Shift+D) to duplicate the current line is expected in any code editor. |
| 11 | **No Ctrl+/ comment toggle** | [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx#L148-L367) | Missing standard editor shortcut. Ctrl+/ to toggle `//` line comments is a universal code editor feature. |
| 12 | **Code formatter destroys indentation inside strings** | [code-formatter.ts](file:///f:/My%20Projects/LearnCraft/components/playground/code-formatter.ts#L134-L135) | Line 135: `formatted.replace(/[ \t]{2,}/g, " ")` collapses multiple spaces into one space. While strings/comments are extracted to placeholders, this regex runs on the protected code — but it also destroys intentional multiple-space indentation patterns and alignment. More critically, the `formatLineTokens()` function re-processes lines that are entirely within a multi-line template literal placeholder, which can break formatting. |

## Proposed Changes

> [!IMPORTANT]
> Only [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx) and [playground.css](file:///f:/My%20Projects/LearnCraft/components/playground/playground.css) will be modified. All other files are untouched.

---

### [MODIFY] [PlaygroundEditor.tsx](file:///f:/My%20Projects/LearnCraft/components/playground/PlaygroundEditor.tsx)

#### Fix #1, #3: Rewrite `scrollCursorIntoView()` 
- Read `lineHeight` from computed style instead of hardcoded `26`
- Read padding from computed style instead of hardcoded `14`
- Increase `verticalBuffer` to 3 lines (78px) for better breathing room
- Use proper scroll calculations that work across all container contexts

#### Fix #4: Remove ArrowLeft/ArrowRight line-boundary blocking
- Delete the `e.preventDefault()` calls at lines 180-183 and 195-197
- Let the browser handle standard cross-line cursor movement natively
- Keep the `scrollCursorIntoView()` call via `requestAnimationFrame`

#### Fix #7: Fix `cursorOffset` race condition
- Defer `syncCursorPos()` reads to `requestAnimationFrame` in `handleChange`
- Ensure cursor offset is captured after React has reconciled the DOM

#### Fix #8: Preserve Undo/Redo using `execCommand('insertText')`
- For Tab, Enter, bracket pairs, and other custom insertions, use `document.execCommand('insertText', false, text)` instead of `onChange(newValue)`
- This preserves the browser's native undo stack while still triggering React's `onChange` through the input event
- Fall back to the current `onChange()` approach if `execCommand` is not supported

#### Fix #9: Add Shift+Tab dedent
- When Shift+Tab is pressed, remove up to 2 leading spaces from the current line(s)
- Support multi-line selection dedent (remove leading spaces from all selected lines)

#### Fix #10: Add Ctrl+D duplicate line
- Duplicate the current line below the cursor
- Position cursor on the duplicated line at the same column

#### Fix #11: Add Ctrl+/ comment toggle
- Toggle `// ` prefix on the current line
- Support multi-line selection: toggle comment on all selected lines

---

### [MODIFY] [playground.css](file:///f:/My%20Projects/LearnCraft/components/playground/playground.css)

#### Fix #2, #5: Fix highlight layer scroll sync
- Change `.playground-highlight-layer` from `overflow: hidden` to `overflow: auto` but hide its scrollbar with CSS (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`)
- This allows the JS `scrollTop`/`scrollLeft` assignments to actually work
- The layer remains non-interactive (`pointer-events: none`)

#### Fix #6: Fix line numbers scroll
- Change `.playground-line-numbers` to `overflow-y: auto` with hidden scrollbar
- This allows `scrollTop` assignments to work, keeping line numbers in sync

#### General: Ensure consistent spacing
- Verify padding values match between textarea and highlight layer
- Add `will-change: transform` hints for smoother scroll performance

## Verification Plan

### Manual Testing Checklist
1. **30+ lines**: Write 50+ lines → verify cursor, scroll, highlighting all stay in sync
2. **ArrowUp/Down**: Navigate all lines → cursor moves correctly, viewport scrolls
3. **ArrowLeft at line start** → cursor moves to end of previous line
4. **ArrowRight at line end** → cursor moves to start of next line
5. **Click anywhere** in 50-line document → typing happens at clicked position
6. **Scroll to bottom, keep typing** → viewport auto-scrolls to keep cursor visible
7. **Ctrl+Z** after Tab/Enter/bracket → undo works correctly
8. **Shift+Tab** → removes 2 leading spaces
9. **Ctrl+/** → toggles line comment
10. **Ctrl+D** → duplicates current line
11. **Fullscreen 3-pane mode** → all fixes work in expanded layout
12. **Syntax highlighting** stays in sync after scrolling
13. **Line numbers** stay in sync after scrolling
14. **Bracket matching** highlights correct brackets after edits
15. **Autocomplete** popover appears at correct position
16. **Code formatting** → Shift+Alt+F works without breaking code
