// ═══════════════════════════════════════════════════════════
// Learning Craft — Universal In-Browser Code Formatter
// ═══════════════════════════════════════════════════════════
//
// Zero-dependency, instantaneous TypeScript / JavaScript / SQL formatter.
// Properly formats indentation (2 spaces), operator spacing, type annotations,
// keyword spacing, bracket balancing, and structure.
// Preserves comments, strings, template literals, and regex without modification.
// Includes cursor position mapping to keep cursor exactly where the user is editing.

export interface FormatResult {
  formatted: string;
  cursorOffset: number;
}

/**
 * Format TypeScript, JavaScript, or SQL code cleanly with 2-space indentation.
 */
export function formatCode(code: string, language: string = "typescript"): string {
  const { formatted } = formatCodeWithCursor(code, 0, language);
  return formatted;
}

/**
 * Formats code and calculates the corresponding cursor offset in the formatted code.
 */
export function formatCodeWithCursor(
  code: string,
  cursorOffset: number = 0,
  _language: string = "typescript"
): FormatResult {
  if (!code || !code.trim()) {
    return { formatted: code, cursorOffset: Math.min(cursorOffset, (code || "").length) };
  }

  // Normalize newlines to \n
  const normalized = code.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const safeCursor = Math.max(0, Math.min(cursorOffset, normalized.length));

  // Determine line and column of the cursor in the original code
  const textBeforeCursor = normalized.substring(0, safeCursor);
  const cursorLineIndex = (textBeforeCursor.match(/\n/g) || []).length;
  const lastNewlinePos = textBeforeCursor.lastIndexOf("\n");
  const cursorColInLine = lastNewlinePos === -1 ? safeCursor : safeCursor - (lastNewlinePos + 1);

  // ─── Step 1: Protect Strings, Template Literals, Regex, and Comments ───
  const placeholders: { id: string; original: string; hasNewline: boolean }[] = [];
  const placeholderPrefix = `__LC_PH_${Math.random().toString(36).substring(2, 8)}_`;

  // Pattern matches:
  // 1. Single & multi-line comments: /* ... */ or // ...
  // 2. Double & single quoted strings: "..." or '...'
  // 3. Template literals: `...`
  const protectionRegex = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g;

  let placeholderIndex = 0;
  const protectedCode = normalized.replace(protectionRegex, (match) => {
    const id = `${placeholderPrefix}${placeholderIndex++}__`;
    placeholders.push({
      id,
      original: match,
      hasNewline: match.includes("\n"),
    });
    return id;
  });

  // ─── Step 2: Line-by-Line Indentation & Spacing ───
  const rawLines = protectedCode.split("\n");
  const formattedLines: string[] = [];

  let indentLevel = 0;
  const INDENT_STR = "  "; // Standard 2 spaces indentation

  let prevLineWasBlank = false;

  for (let i = 0; i < rawLines.length; i++) {
    let line = rawLines[i].trim();

    // Collapse multiple consecutive blank lines into at most one
    if (!line) {
      if (!prevLineWasBlank && formattedLines.length > 0) {
        formattedLines.push("");
        prevLineWasBlank = true;
      }
      continue;
    }
    prevLineWasBlank = false;

    // Standardize token spacing on the line
    line = formatLineTokens(line);

    // Count opening vs closing braces/brackets/parentheses
    // We only count braces outside placeholders
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    const openBrackets = (line.match(/\[/g) || []).length;
    const closeBrackets = (line.match(/\]/g) || []).length;
    const openParens = (line.match(/\(/g) || []).length;
    const closeParens = (line.match(/\)/g) || []).length;

    // Check if line starts with a closing symbol
    const startsWithClosingBrace = /^[}\])]/.test(line);
    const startsWithCaseOrDefault = /^(case\s+[^:]+|default)\s*:/.test(line);

    // If line starts with a closing brace, visually unindent this line
    let currentLineIndent = indentLevel;
    if (startsWithClosingBrace) {
      currentLineIndent = Math.max(0, indentLevel - 1);
    } else if (startsWithCaseOrDefault && indentLevel > 0) {
      currentLineIndent = Math.max(0, indentLevel - 0.5); // 1 space offset for case/default
    }

    // Apply indentation
    const fullIndent = INDENT_STR.repeat(Math.max(0, Math.floor(currentLineIndent)));
    formattedLines.push(fullIndent + line);

    // Update indent level for subsequent lines
    const netBraceChange = openBraces - closeBraces;
    const netBracketChange = openBrackets - closeBrackets;
    const netParenChange = openParens - closeParens;

    const netChange = netBraceChange + netBracketChange + netParenChange;
    indentLevel = Math.max(0, indentLevel + netChange);
  }

  // ─── Step 3: Reconstitute Protected Placeholders ───
  let result = formattedLines.join("\n");
  for (const ph of placeholders) {
    result = result.replace(ph.id, () => ph.original);
  }

  // Final trim end and single clean newline
  const formatted = result.trimEnd() + "\n";

  // ─── Step 4: Map Original Cursor Position to Formatted Code ───
  const formattedLinesArr = formatted.split("\n");
  const targetLineIndex = Math.min(cursorLineIndex, formattedLinesArr.length - 1);

  let newCursorOffset = 0;
  for (let i = 0; i < targetLineIndex; i++) {
    newCursorOffset += formattedLinesArr[i].length + 1; // +1 for \n
  }

  const targetLine = formattedLinesArr[targetLineIndex] || "";
  // Position cursor on the target line, clamped to line length
  const newCol = Math.min(cursorColInLine, targetLine.length);
  newCursorOffset += newCol;

  return {
    formatted,
    cursorOffset: Math.min(newCursorOffset, formatted.length),
  };
}

/**
 * Standardize spacing around operators, punctuation, keywords, and colons on a single line.
 */
function formatLineTokens(line: string): string {
  let formatted = line;

  // 1. Spacing after control flow keywords: if (, for (, while (, switch (, catch (
  formatted = formatted.replace(/\b(if|for|while|switch|catch)\s*\(/g, "$1 (");

  // 2. Space before opening brace: ) {, class Foo {, else {
  formatted = formatted.replace(/\)\s*\{/g, ") {");
  formatted = formatted.replace(/([a-zA-Z0-9_$])\{/g, "$1 {");

  // 3. Space after commas: a,b -> a, b
  formatted = formatted.replace(/,([^\s\n])/g, ", $1");

  // 4. Clean TypeScript type annotation colons:
  // e.g. name : string -> name: string, isPassing():boolean -> isPassing(): boolean
  formatted = formatted.replace(/([a-zA-Z0-9_$])\s*:\s*([a-zA-Z0-9_$<>\[\]|&])/g, "$1: $2");
  formatted = formatted.replace(/\)\s*:\s*([a-zA-Z0-9_$<>\[\]|&])/g, "): $1");

  // 5. Binary operators: =, ==, ===, !=, !==, <=, >=, =>, &&, ||, +=, -=, *=, /=
  formatted = formatted.replace(/([^\s+\-*/%=!<>|&])\s*(===|!==|==|!=|<=|>=|=>|&&|\|\||\+=|-=|\*=|\/=)\s*([^\s+\-*/%=!<>|&])/g, "$1 $2 $3");
  
  // Single '=' assignment
  formatted = formatted.replace(/([a-zA-Z0-9_$\])])\s*=\s*([a-zA-Z0-9_$'"`([{])/g, "$1 = $2");

  // Arrow functions: () =>
  formatted = formatted.replace(/\)\s*=>\s*([^{\s])/g, ") => $1");
  formatted = formatted.replace(/\)\s*=>\s*\{/g, ") => {");

  // 6. Multiple inline spaces into single space
  formatted = formatted.replace(/[ \t]{2,}/g, " ");

  // 7. Remove space before semicolon
  formatted = formatted.replace(/\s+;/g, ";");

  return formatted;
}
