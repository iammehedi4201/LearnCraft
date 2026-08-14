// ═══════════════════════════════════════════════════════════
// Learning Craft — Universal In-Browser Code Formatter
// ═══════════════════════════════════════════════════════════
//
// Zero-dependency, instantaneous TypeScript / JavaScript / SQL formatter.
// Properly formats indentation (2 spaces), operator spacing, type annotations,
// keyword spacing, bracket balancing, and structure.
// Preserves comments and strings without modification.

/**
 * Format TypeScript or JavaScript code cleanly with 2-space indentation.
 */
export function formatCode(code: string, language: string = "typescript"): string {
  if (!code || !code.trim()) return code;

  // Normalize newlines
  const normalized = code.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // Step 1: Extract strings and comments into placeholders to protect them from regex edits
  const placeholders: string[] = [];
  const placeholderPrefix = `__LC_STR_PH_${Date.now().toString(36)}_`;

  // Protect template literals, double-quoted, single-quoted strings, and comments
  const protectedCode = normalized.replace(
    /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\/\*[\s\S]*?\*\/|\/\/[^\n]*)/g,
    (match) => {
      const id = `${placeholderPrefix}${placeholders.length}__`;
      placeholders.push(match);
      return id;
    }
  );

  // Step 2: Split into lines and process spacing & indentation
  const rawLines = protectedCode.split("\n");
  const formattedLines: string[] = [];

  let indentLevel = 0;
  const INDENT_STR = "  "; // 2 spaces

  let prevLineWasBlank = false;

  for (let i = 0; i < rawLines.length; i++) {
    let line = rawLines[i].trim();

    // Handle empty lines (collapse consecutive blank lines into at most one)
    if (!line) {
      if (!prevLineWasBlank && formattedLines.length > 0) {
        formattedLines.push("");
        prevLineWasBlank = true;
      }
      continue;
    }
    prevLineWasBlank = false;

    // Standardize spacing on the line
    line = formatLineTokens(line);

    // Count opening vs closing braces on this line
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    const openBrackets = (line.match(/\[/g) || []).length;
    const closeBrackets = (line.match(/\]/g) || []).length;
    const openParens = (line.match(/\(/g) || []).length;
    const closeParens = (line.match(/\)/g) || []).length;

    // Check if line begins with a closing bracket/brace
    const startsWithClosingBrace = /^[}\])]/.test(line);
    const startsWithCaseOrDefault = /^(case\s+[^:]+|default)\s*:/.test(line);

    // If line starts with a closing brace/bracket, decrement indent before indenting this line
    let currentLineIndent = indentLevel;
    if (startsWithClosingBrace) {
      currentLineIndent = Math.max(0, indentLevel - 1);
    } else if (startsWithCaseOrDefault && indentLevel > 0) {
      currentLineIndent = Math.max(0, indentLevel - 0.5); // align case half-indent
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

  // Step 3: Reconstitute placeholders (strings & comments)
  let result = formattedLines.join("\n");
  for (let i = 0; i < placeholders.length; i++) {
    const id = `${placeholderPrefix}${i}__`;
    result = result.replace(id, () => placeholders[i]);
  }

  // Remove any trailing whitespace at the very end and add clean final newline
  return result.trimEnd() + "\n";
}

/**
 * Clean up spacing between operators, colons, commas, and keywords on a single line.
 */
function formatLineTokens(line: string): string {
  let formatted = line;

  // 1. Spacing after keywords: if(, for(, while(, switch(, catch( -> if (, for (, etc.
  formatted = formatted.replace(/\b(if|for|while|switch|catch)\s*\(/g, "$1 (");

  // 2. Spacing before opening braces: class Student{, isPassing(){, if () {
  formatted = formatted.replace(/([^\s])\{/g, "$1 {");
  formatted = formatted.replace(/\)\{/g, ") {");

  // 3. Spacing after commas: (a,b,c) -> (a, b, c)
  formatted = formatted.replace(/,([^\s\n])/g, ", $1");

  // 4. Clean TypeScript type annotation colons:
  // e.g. name : string -> name: string, isPassing():boolean -> isPassing(): boolean
  formatted = formatted.replace(/([a-zA-Z0-9_$])\s*:\s*([a-zA-Z0-9_$<>\[\]|&])/g, "$1: $2");
  formatted = formatted.replace(/\)\s*:\s*([a-zA-Z0-9_$<>\[\]|&])/g, "): $1");

  // 5. Binary operator spacing: = , == , === , != , !== , + , - , * , / , >= , <= , => , && , || , += , -=
  // Ensure single space around binary operators
  formatted = formatted.replace(/([^\s+\-*/%=!<>|&])\s*([=+\-*/%]=|===|!==|==|!=|<=|>=|=>|&&|\|\|)\s*([^\s+\-*/%=!<>|&])/g, "$1 $2 $3");
  
  // Single '=' assignment spacing (not inside <= or >= or == or ===)
  formatted = formatted.replace(/([a-zA-Z0-9_$\])])\s*=\s*([a-zA-Z0-9_$'"`([{])/g, "$1 = $2");

  // 6. Arrow functions: () =>, (x) =>
  formatted = formatted.replace(/\)\s*=>\s*([^{\s])/g, ") => $1");
  formatted = formatted.replace(/\)\s*=>\s*\{/g, ") => {");

  // 7. Clean multiple spaces into single space (except at line start)
  formatted = formatted.replace(/[ \t]{2,}/g, " ");

  // 8. Semicolon spacing: remove space before semicolon
  formatted = formatted.replace(/\s+;/g, ";");

  return formatted;
}
