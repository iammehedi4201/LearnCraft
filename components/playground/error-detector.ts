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

  // ─── 2. Access Modifier Validation ───
  let insideClass = false;
  let insideInterface = false;
  let classBraceDepth = 0;
  let currentClassName = "";
  const privateMembersByClass: { className: string; members: Set<string> }[] = [];
  let currentClassPrivateMembers = new Set<string>();

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const lineNum = i + 1;

    // Strip comments and strings for structural inspection
    const cleanLine = rawLine
      .replace(/\/\/[^\n]*/, "")
      .replace(/'(?:\\.|[^'\\])*'/g, "''")
      .replace(/"(?:\\.|[^"\\])*"/g, '""')
      .replace(/`(?:\\.|[^`\\])*`/g, "``")
      .trim();

    if (!cleanLine) continue;

    // Check invalid class method keyword: class A { function foo() {} }
    if (insideClass && /^\s*function\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/.test(cleanLine)) {
      return {
        line: lineNum,
        message: `In TypeScript/JavaScript classes, methods should not use the 'function' keyword.`,
        suggestion: `Remove 'function' on line ${lineNum}: write '${cleanLine.replace(/^function\s+/, "")}' instead.`,
      };
    }

    // Track interface start
    if (/^\s*(?:export\s+)?interface\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/.test(cleanLine)) {
      insideInterface = true;
    }

    // Track class start
    const classMatch = cleanLine.match(
      /^\s*(?:export\s+|abstract\s+)*class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/
    );
    if (classMatch) {
      insideClass = true;
      currentClassName = classMatch[1];
      currentClassPrivateMembers = new Set<string>();
      privateMembersByClass.push({
        className: currentClassName,
        members: currentClassPrivateMembers,
      });
    }

    // Track brace changes for class/interface scope
    const openBraces = (cleanLine.match(/\{/g) || []).length;
    const closeBraces = (cleanLine.match(/\}/g) || []).length;
    if (insideClass || insideInterface) {
      classBraceDepth += openBraces - closeBraces;
      if (classBraceDepth <= 0) {
        insideClass = false;
        insideInterface = false;
        classBraceDepth = 0;
      }
    }

    // 2A. Check typos in access modifiers (e.g. pablic, privat, proctected, protect, pubic, privite)
    const typoMatch = cleanLine.match(
      /\b(pablic|pubic|publc|pubilc|privat|privite|prive|privete|proctected|protect|procted|proteced|proctect)\b/i
    );
    if (typoMatch) {
      const typo = typoMatch[1];
      let suggestion = "public";
      if (/^priv/i.test(typo)) suggestion = "private";
      else if (/^pro/i.test(typo)) suggestion = "protected";

      return {
        line: lineNum,
        message: `Invalid access modifier '${typo}'. Did you mean '${suggestion}'?`,
        suggestion: `TypeScript access modifiers can only be 'public', 'private', or 'protected'.`,
      };
    }

    // 2B. Check multiple / duplicate access modifiers on the same member (e.g. public private name)
    const multiModMatch = cleanLine.match(
      /\b(public|private|protected)\s+(public|private|protected)\b/
    );
    if (multiModMatch) {
      return {
        line: lineNum,
        message: `Multiple access modifiers ('${multiModMatch[1]}' and '${multiModMatch[2]}') cannot be used on the same member.`,
        suggestion: `A class member can have only one accessibility level: choose either 'public', 'private', or 'protected'.`,
      };
    }

    // 2C. Check access modifiers inside an interface
    if (insideInterface) {
      const ifaceModMatch = cleanLine.match(
        /\b(public|private|protected)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/
      );
      if (ifaceModMatch) {
        return {
          line: lineNum,
          message: `Access modifier '${ifaceModMatch[1]}' cannot be used inside an interface.`,
          suggestion: `All interface members are automatically public. Remove '${ifaceModMatch[1]}' from '${ifaceModMatch[2]}'.`,
        };
      }
    }

    // 2D. Check access modifiers inside an object literal
    if (!insideClass && !insideInterface) {
      const objLitMatch = cleanLine.match(
        /[{,]\s*(public|private|protected)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/
      );
      if (objLitMatch) {
        return {
          line: lineNum,
          message: `Access modifier '${objLitMatch[1]}' cannot be used inside an object literal.`,
          suggestion: `Object literal properties do not support access modifiers. Remove '${objLitMatch[1]}'.`,
        };
      }
    }

    // 2E. Check access modifiers outside a class (standalone variables or standalone functions)
    if (!insideClass) {
      const standaloneMatch = cleanLine.match(
        /^(?:export\s+)?(public|private|protected)\s+(?:(const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)|(function\s+[a-zA-Z_$][a-zA-Z0-9_$]*)|([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[:=])/
      );
      if (standaloneMatch) {
        const mod = standaloneMatch[1];
        const isFunc = !!standaloneMatch[4];
        if (isFunc) {
          return {
            line: lineNum,
            message: `Access modifier '${mod}' cannot be used on standalone functions.`,
            suggestion: `Access modifiers only apply to class methods. Remove '${mod}' or move the function inside a class.`,
          };
        }
        return {
          line: lineNum,
          message: `Access modifier '${mod}' cannot be used on local or top-level variables.`,
          suggestion: `Access modifiers ('public', 'private', 'protected') only apply to class members. Remove '${mod}'.`,
        };
      }
    }

    // 2F. Check access modifiers on non-constructor function/method parameters
    // e.g. function foo(public a: number) or myMethod(private b: string)
    const isConstructorLine = /constructor\s*\(/.test(cleanLine);
    if (!isConstructorLine) {
      const paramModMatch = cleanLine.match(
        /(?:\bfunction\s+[a-zA-Z_$][a-zA-Z0-9_$]*|\b[a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\b(public|private|protected)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/
      );
      if (paramModMatch) {
        const mod = paramModMatch[1];
        const paramName = paramModMatch[2];
        return {
          line: lineNum,
          message: `Access modifier '${mod}' cannot be used on regular method/function parameter '${paramName}'.`,
          suggestion: `Parameter properties ('${mod}') are only allowed inside class 'constructor(...)' parameter lists. Remove '${mod}' from '${paramName}'.`,
        };
      }
    }

    // Record private members declared inside a class for external access violation checking
    if (insideClass) {
      const privateFieldMatch = cleanLine.match(
        /\bprivate\s+(?:readonly\s+)?(?:static\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)/
      );
      if (privateFieldMatch) {
        currentClassPrivateMembers.add(privateFieldMatch[1]);
      }
    }
  }

  // ─── 3. Check for Private Property Access Violations from Outside the Class ───
  let classScope = false;
  let currentScopeDepth = 0;
  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const lineNum = i + 1;
    const cleanLine = rawLine.replace(/\/\/[^\n]*/, "").trim();

    if (/^\s*(?:export\s+|abstract\s+)*class\s+/.test(cleanLine)) {
      classScope = true;
    }
    const openBraces = (cleanLine.match(/\{/g) || []).length;
    const closeBraces = (cleanLine.match(/\}/g) || []).length;
    if (classScope) {
      currentScopeDepth += openBraces - closeBraces;
      if (currentScopeDepth <= 0) {
        classScope = false;
        currentScopeDepth = 0;
      }
    }

    // If outside all classes, check if calling/accessing any private property on an object (not 'this')
    if (!classScope) {
      for (const { className, members } of privateMembersByClass) {
        for (const member of members) {
          const regex = new RegExp(`\\b(?!this\\b)([a-zA-Z_$][a-zA-Z0-9_$]*)\\.${member}\\b`);
          const accessMatch = cleanLine.match(regex);
          if (accessMatch) {
            const objName = accessMatch[1];
            return {
              line: lineNum,
              message: `Property '${member}' is private and only accessible within class '${className}'.`,
              suggestion: `You cannot access '${objName}.${member}' directly outside the class. Provide a public method (e.g. 'get${member.charAt(0).toUpperCase() + member.slice(1)}()') or change '${member}' to public.`,
            };
          }
        }
      }
    }
  }

  // ─── 4. Missing Argument Commas & Function Keyword Checks ───
  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const lineNum = i + 1;

    // Strip line comments
    const line = rawLine.replace(/\/\/[^\n]*/, "").trim();
    if (!line) continue;

    // Matches genuine function calls with missing commas e.g. foo("Alvi" 80) or new Student("Alvi" 80)
    const missingCommaArgMatch = line.match(
      /(?:\bnew\s+[a-zA-Z_$][a-zA-Z0-9_$]*|\b[a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(\s*(?:"[^"]*"|'[^']*'|[0-9]+)\s+(?:"[^"]*"|'[^']*'|[0-9]+)/
    );
    const isControlKeyword = /^\s*(?:if|while|for|switch|catch)\b/.test(line);

    if (missingCommaArgMatch && !isControlKeyword) {
      return {
        line: lineNum,
        message: `Missing comma (,) between arguments on line ${lineNum}.`,
        suggestion: `Add a comma to separate arguments: e.g. ("Alvi", 80) instead of ("Alvi" 80).`,
      };
    }

  }

  return null;
}
