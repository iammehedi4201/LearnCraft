// ═══════════════════════════════════════════════════════════
// Learning Craft — Code Error & Line Number Detector
// ═══════════════════════════════════════════════════════════
//
// Accurately discovers exact error lines, missing brackets, unclosed quotes,
// missing argument commas, and runtime stack trace coordinates.

export interface DetectedError {
  line?: number;
  column?: number;
  message: string;
  technicalMessage?: string;
  suggestion?: string;
}

/**
 * Parses stack traces or error messages to find the exact line and column number.
 */
export function extractLineFromStack(stackOrMsg: string): { line?: number; column?: number } {
  if (!stackOrMsg) return {};

  const clean = stackOrMsg.replace(/\r\n/g, "\n");
  const lines = clean.split("\n");

  // Iterate over stack lines
  for (const stackLine of lines) {
    // 1. Look for <anonymous>:LINE:COL or blob:...:LINE:COL or Function:LINE:COL
    const match1 = stackLine.match(/(?:<anonymous>|eval|Function|blob:[^:\s]+|at\s+[^:]+):(\d+):(\d+)/i);
    if (match1) {
      const l = parseInt(match1[1], 10);
      const c = parseInt(match1[2], 10);
      if (!isNaN(l) && l > 0) return { line: l, column: c };
    }

    // 2. Look for (:LINE:COL) or (:LINE)
    const match2 = stackLine.match(/\((\d+):(\d+)\)/);
    if (match2) {
      const l = parseInt(match2[1], 10);
      const c = parseInt(match2[2], 10);
      if (!isNaN(l) && l > 0) return { line: l, column: c };
    }

    // 3. Firefox: line X > eval:LINE:COL
    const match3 = stackLine.match(/line\s+(\d+)\s*>\s*Function:(\d+):(\d+)/i);
    if (match3) {
      const l = parseInt(match3[2], 10);
      const c = parseInt(match3[3], 10);
      if (!isNaN(l) && l > 0) return { line: l, column: c };
    }

    // 4. General line N pattern
    const match4 = stackLine.match(/\bline\s+(\d+)\b/i);
    if (match4) {
      const l = parseInt(match4[1], 10);
      if (!isNaN(l) && l > 0) return { line: l };
    }
  }

  return {};
}

/**
 * Statically inspects user code to locate exact line numbers for syntax errors.
 * Useful when JavaScript's new Function() throws a SyntaxError without a line number.
 */
export function detectSyntaxErrorLine(code: string): DetectedError | null {
  if (!code || !code.trim()) return null;

  const rawLines = code.split("\n");

  // 1. Check for Unmatched Brackets, Parentheses, and Quotes
  const stack: { char: string; line: number; col: number }[] = [];
  let inDoubleQuote = false;
  let doubleQuoteLine = 0;
  let inSingleQuote = false;
  let singleQuoteLine = 0;
  let inBacktick = false;
  let backtickLine = 0;
  let inBlockComment = false;
  let blockCommentLine = 0;

  for (let lineIdx = 0; lineIdx < rawLines.length; lineIdx++) {
    const lineNum = lineIdx + 1;
    const lineText = rawLines[lineIdx];

    for (let charIdx = 0; charIdx < lineText.length; charIdx++) {
      const char = lineText[charIdx];
      const prevChar = charIdx > 0 ? lineText[charIdx - 1] : "";
      const nextChar = charIdx < lineText.length - 1 ? lineText[charIdx + 1] : "";

      // Handle comments
      if (!inDoubleQuote && !inSingleQuote && !inBacktick) {
        if (!inBlockComment && char === "/" && nextChar === "/") {
          // Line comment: skip rest of this line
          break;
        }
        if (!inBlockComment && char === "/" && nextChar === "*") {
          inBlockComment = true;
          blockCommentLine = lineNum;
          charIdx++;
          continue;
        }
        if (inBlockComment && char === "*" && nextChar === "/") {
          inBlockComment = false;
          charIdx++;
          continue;
        }
      }
      if (inBlockComment) continue;

      // Handle quotes (with escape check)
      const isEscaped = prevChar === "\\" && (charIdx < 2 || lineText[charIdx - 2] !== "\\");

      if (char === '"' && !inSingleQuote && !inBacktick && !isEscaped) {
        if (inDoubleQuote) {
          inDoubleQuote = false;
        } else {
          inDoubleQuote = true;
          doubleQuoteLine = lineNum;
        }
        continue;
      }
      if (char === "'" && !inDoubleQuote && !inBacktick && !isEscaped) {
        if (inSingleQuote) {
          inSingleQuote = false;
        } else {
          inSingleQuote = true;
          singleQuoteLine = lineNum;
        }
        continue;
      }
      if (char === "`" && !inDoubleQuote && !inSingleQuote && !isEscaped) {
        if (inBacktick) {
          inBacktick = false;
        } else {
          inBacktick = true;
          backtickLine = lineNum;
        }
        continue;
      }

      if (inDoubleQuote || inSingleQuote || inBacktick) continue;

      // Handle brackets
      if (char === "{" || char === "(" || char === "[") {
        stack.push({ char, line: lineNum, col: charIdx + 1 });
      } else if (char === "}" || char === ")" || char === "]") {
        if (stack.length === 0) {
          return {
            line: lineNum,
            column: charIdx + 1,
            message: `Unexpected closing '${char}'.`,
            suggestion: `Check for an extra '${char}' on line ${lineNum} or a missing opening bracket.`,
          };
        }
        const top = stack.pop()!;
        const expected = top.char === "{" ? "}" : top.char === "(" ? ")" : "]";
        if (char !== expected) {
          return {
            line: lineNum,
            column: charIdx + 1,
            message: `Mismatched brackets: Expected '${expected}' to close '${top.char}' from line ${top.line}, but found '${char}'.`,
            suggestion: `Make sure your brackets and parentheses match properly on lines ${top.line} and ${lineNum}.`,
          };
        }
      }
    }

    // Single/double quotes cannot span across lines without escaping
    if (inDoubleQuote && lineNum === doubleQuoteLine) {
      inDoubleQuote = false;
      return {
        line: lineNum,
        message: `Unterminated double quote (") on line ${lineNum}.`,
        suggestion: `Close the string with a matching quote (") at the end of the line.`,
      };
    }
    if (inSingleQuote && lineNum === singleQuoteLine) {
      inSingleQuote = false;
      return {
        line: lineNum,
        message: `Unterminated single quote (') on line ${lineNum}.`,
        suggestion: `Close the string with a matching single quote (') at the end of the line.`,
      };
    }
  }

  // Check unclosed block comment
  if (inBlockComment) {
    return {
      line: blockCommentLine,
      message: `Unclosed block comment (/*) started on line ${blockCommentLine}.`,
      suggestion: `Add '*/' to close the block comment.`,
    };
  }

  // Check unclosed backtick template literal
  if (inBacktick) {
    return {
      line: backtickLine,
      message: `Unterminated template literal (\`) started on line ${backtickLine}.`,
      suggestion: `Add a closing backtick (\`) to complete the template literal.`,
    };
  }

  // Check unclosed opening brackets
  if (stack.length > 0) {
    const unclosed = stack[stack.length - 1];
    const bracketName = unclosed.char === "{" ? "curly brace '{'" : unclosed.char === "(" ? "parenthesis '('" : "square bracket '['";
    return {
      line: unclosed.line,
      column: unclosed.col,
      message: `Unclosed ${bracketName} opened on line ${unclosed.line}.`,
      suggestion: `Add a matching closing bracket before the end of the file.`,
    };
  }

  // 2. Check for missing commas in function arguments or constructor calls
  // e.g. new Student ("Alvi" 80) or foo("hello" 123)
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const lineNum = i + 1;

    // Matches e.g. ("str" 80) or ('str' 80) or (varName 80) where a comma is missing
    const missingCommaArgMatch = line.match(/\(\s*(?:"[^"]*"|'[^']*'|[a-zA-Z_$][a-zA-Z0-9_$]*)\s+(?:"[^"]*"|'[^']*'|[0-9]+|[a-zA-Z_$][a-zA-Z0-9_$]*)/);
    if (missingCommaArgMatch) {
      return {
        line: lineNum,
        message: `Missing comma (,) between arguments on line ${lineNum}.`,
        suggestion: `Add a comma to separate arguments: e.g. ("Alvi", 80) instead of ("Alvi" 80).`,
      };
    }

    // Check invalid class method keyword: class A { function foo() {} }
    if (/^\s*function\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/.test(line)) {
      // Check if inside a class by looking backwards
      const preceding = rawLines.slice(0, i).join("\n");
      if (preceding.includes("class ")) {
        return {
          line: lineNum,
          message: `In TypeScript/JavaScript classes, methods should not use the 'function' keyword.`,
          suggestion: `Remove 'function' on line ${lineNum}: write '${line.trim().replace(/^function\s+/, "")}' instead.`,
        };
      }
    }
  }

  return null;
}
