// ═══════════════════════════════════════════════════════════
// Learning Craft — Code Syntax Highlighter for Playground
// Featuring:
// 1. Rainbow Bracket Pair Colorizer (VS Code Style)
// 2. Active Cursor Bracket Pair Highlight & Glow
// ═══════════════════════════════════════════════════════════

import type { ReactNode } from "react";

// Token pattern regular expressions (ordered by precedence)
const TOKEN_RULES: { type: string; regex: RegExp; className: string }[] = [
  // Multi-line and single-line comments
  { type: "comment", regex: /^(\/\*[\s\S]*?\*\/|\/\/[^\n]*)/, className: "pl-token-comment" },
  
  // Strings (single-quoted, double-quoted, template literals)
  { type: "string", regex: /^("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/, className: "pl-token-string" },
  
  // Decorators (e.g. @Controller, @Injectable)
  { type: "decorator", regex: /^@[a-zA-Z_$][a-zA-Z0-9_$]*/, className: "pl-token-decorator" },
  
  // Keywords (control flow, declarations, modifiers)
  {
    type: "keyword",
    regex: /^(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|default|try|catch|finally|throw|new|class|constructor|extends|super|this|static|get|set|public|private|protected|readonly|import|export|from|as|interface|type|enum|implements|typeof|instanceof|async|await|yield|void|debugger|in|of|keyof|is)\b/,
    className: "pl-token-keyword",
  },
  
  // SQL Keywords
  {
    type: "sql-keyword",
    regex: /^(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|GROUP|ORDER|BY|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|PRIMARY|KEY|FOREIGN|REFERENCES|DISTINCT|UNION|ALL|AND|OR|NOT|NULL|IS|AS)\b/i,
    className: "pl-token-keyword",
  },
  
  // Booleans and null literals
  { type: "boolean", regex: /^(true|false|null|undefined|NaN|Infinity)\b/, className: "pl-token-boolean" },
  
  // Built-in types
  {
    type: "type",
    regex: /^(string|number|boolean|any|unknown|never|object|symbol|bigint|Array|Promise|Record|Partial|Required|Readonly|Pick|Omit|Exclude|Extract|NonNullable|ReturnType|InstanceType)\b/,
    className: "pl-token-type",
  },
  
  // Standard Global Objects / Console
  { type: "global", regex: /^(console|Math|JSON|Object|Array|Promise|Date|Number|String|Boolean|RegExp|Set|Map|WeakSet|WeakMap|window|document|process|globalThis)\b/, className: "pl-token-global" },
  
  // Numbers (hex, float, int)
  { type: "number", regex: /^(0x[0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/, className: "pl-token-number" },
  
  // Function call or declaration identifier, e.g. helloWorld( or greetUser(
  { type: "function", regex: /^([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/, className: "pl-token-function" },
  
  // Property / member accessor following a dot, e.g. .log, .map, .filter
  { type: "property", regex: /^(\.[a-zA-Z_$][a-zA-Z0-9_$]*)/, className: "pl-token-property" },
  
  // Operators
  { type: "operator", regex: /^(=>|===|!==|==|!=|<=|>=|&&|\|\||\+\+|--|\+=|-=|\*=|(?:\/)=|\+|-|\*|\/|%|!|<|>|\?|:|\.\.\.)/, className: "pl-token-operator" },
  
  // Individual Brackets
  { type: "bracket-curly", regex: /^[{}]/, className: "pl-bracket-curly" },
  { type: "bracket-paren", regex: /^[()]/, className: "pl-bracket-paren" },
  { type: "bracket-square", regex: /^[\[\]]/, className: "pl-bracket-square" },
  
  // Punctuation separators
  { type: "punctuation", regex: /^([;,])/, className: "pl-token-punctuation" },
  
  // Plain words / variable identifiers
  { type: "identifier", regex: /^[a-zA-Z_$][a-zA-Z0-9_$]*/, className: "pl-token-identifier" },
  
  // Whitespace and other characters
  { type: "other", regex: /^[\s\S]/, className: "" },
];

interface RawToken {
  type: string;
  text: string;
  start: number;
  end: number;
  className: string;
}

interface BracketInfo {
  index: number;
  depth: number;
  kind: "curly" | "paren" | "square";
  role: "open" | "close";
  matchIndex?: number;
}

/**
 * Tokenizes and highlights code text into styled React nodes with
 * Rainbow Brackets and Interactive Cursor Bracket Matching.
 */
export function highlightCode(
  code: string,
  cursorOffset?: number | null
): ReactNode[] {
  if (!code) return [];

  // ─── Step 1: Lexical Tokenization ───
  const rawTokens: RawToken[] = [];
  let remaining = code;
  let currentPos = 0;

  while (remaining.length > 0) {
    let matched = false;

    for (const rule of TOKEN_RULES) {
      const match = remaining.match(rule.regex);
      if (match) {
        const text = match[0];
        rawTokens.push({
          type: rule.type,
          text,
          start: currentPos,
          end: currentPos + text.length,
          className: rule.className,
        });
        currentPos += text.length;
        remaining = remaining.substring(text.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      rawTokens.push({
        type: "other",
        text: remaining[0],
        start: currentPos,
        end: currentPos + 1,
        className: "",
      });
      currentPos += 1;
      remaining = remaining.substring(1);
    }
  }

  // ─── Step 2: Bracket Pair Depth & Matching Computation ───
  const bracketMap = new Map<number, BracketInfo>();
  const curlyStack: { index: number; depth: number }[] = [];
  const parenStack: { index: number; depth: number }[] = [];
  const squareStack: { index: number; depth: number }[] = [];

  for (const token of rawTokens) {
    if (token.type === "bracket-curly") {
      if (token.text === "{") {
        const depth = curlyStack.length % 5;
        curlyStack.push({ index: token.start, depth });
        bracketMap.set(token.start, {
          index: token.start,
          depth,
          kind: "curly",
          role: "open",
        });
      } else if (token.text === "}") {
        const matchingOpen = curlyStack.pop();
        const depth = matchingOpen ? matchingOpen.depth : 0;
        bracketMap.set(token.start, {
          index: token.start,
          depth,
          kind: "curly",
          role: "close",
          matchIndex: matchingOpen?.index,
        });
        if (matchingOpen) {
          const openEntry = bracketMap.get(matchingOpen.index);
          if (openEntry) openEntry.matchIndex = token.start;
        }
      }
    } else if (token.type === "bracket-paren") {
      if (token.text === "(") {
        const depth = parenStack.length % 5;
        parenStack.push({ index: token.start, depth });
        bracketMap.set(token.start, {
          index: token.start,
          depth,
          kind: "paren",
          role: "open",
        });
      } else if (token.text === ")") {
        const matchingOpen = parenStack.pop();
        const depth = matchingOpen ? matchingOpen.depth : 0;
        bracketMap.set(token.start, {
          index: token.start,
          depth,
          kind: "paren",
          role: "close",
          matchIndex: matchingOpen?.index,
        });
        if (matchingOpen) {
          const openEntry = bracketMap.get(matchingOpen.index);
          if (openEntry) openEntry.matchIndex = token.start;
        }
      }
    } else if (token.type === "bracket-square") {
      if (token.text === "[") {
        const depth = squareStack.length % 5;
        squareStack.push({ index: token.start, depth });
        bracketMap.set(token.start, {
          index: token.start,
          depth,
          kind: "square",
          role: "open",
        });
      } else if (token.text === "]") {
        const matchingOpen = squareStack.pop();
        const depth = matchingOpen ? matchingOpen.depth : 0;
        bracketMap.set(token.start, {
          index: token.start,
          depth,
          kind: "square",
          role: "close",
          matchIndex: matchingOpen?.index,
        });
        if (matchingOpen) {
          const openEntry = bracketMap.get(matchingOpen.index);
          if (openEntry) openEntry.matchIndex = token.start;
        }
      }
    }
  }

  // ─── Step 3: Active Cursor Bracket Pair Highlight ───
  const activeMatchedIndices = new Set<number>();
  if (typeof cursorOffset === "number") {
    // Check if cursor is directly on or immediately after a bracket
    const candidateIndices = [cursorOffset, cursorOffset - 1];
    for (const cIndex of candidateIndices) {
      const bInfo = bracketMap.get(cIndex);
      if (bInfo) {
        activeMatchedIndices.add(bInfo.index);
        if (typeof bInfo.matchIndex === "number") {
          activeMatchedIndices.add(bInfo.matchIndex);
        }
        break; // Match found
      }
    }
  }

  // ─── Step 4: Render Styled React Nodes ───
  const nodes: ReactNode[] = [];
  let keyIndex = 0;

  for (const token of rawTokens) {
    if (
      token.type === "bracket-curly" ||
      token.type === "bracket-paren" ||
      token.type === "bracket-square"
    ) {
      const bInfo = bracketMap.get(token.start);
      const depth = bInfo ? bInfo.depth : 0;
      const isMatched = activeMatchedIndices.has(token.start);

      const bracketClasses = [
        "pl-bracket",
        `pl-bracket-depth-${depth}`,
        isMatched ? "pl-bracket--matched" : "",
      ]
        .filter(Boolean)
        .join(" ");

      nodes.push(
        <span key={keyIndex++} className={bracketClasses}>
          {token.text}
        </span>
      );
    } else if (token.className) {
      nodes.push(
        <span key={keyIndex++} className={token.className}>
          {token.text}
        </span>
      );
    } else {
      nodes.push(token.text);
    }
  }

  return nodes;
}
