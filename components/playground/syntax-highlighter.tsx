// ═══════════════════════════════════════════════════════════
// Learning Craft — Code Syntax Highlighter for Playground
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
  
  // Punctuation brackets and separators
  { type: "punctuation", regex: /^([{}()[\];,])/, className: "pl-token-punctuation" },
  
  // Plain words / variable identifiers
  { type: "identifier", regex: /^[a-zA-Z_$][a-zA-Z0-9_$]*/, className: "pl-token-identifier" },
  
  // Whitespace and other characters
  { type: "other", regex: /^[\s\S]/, className: "" },
];

/**
 * Tokenizes and highlights code text into styled React nodes.
 * Guaranteed to produce exact 1-to-1 character text content matching input.
 */
export function highlightCode(code: string): ReactNode[] {
  if (!code) return [];

  const nodes: ReactNode[] = [];
  let remaining = code;
  let keyIndex = 0;

  while (remaining.length > 0) {
    let matched = false;

    for (const rule of TOKEN_RULES) {
      const match = remaining.match(rule.regex);
      if (match) {
        const text = match[0];
        if (rule.className) {
          nodes.push(
            <span key={keyIndex++} className={rule.className}>
              {text}
            </span>
          );
        } else {
          nodes.push(text);
        }
        remaining = remaining.substring(text.length);
        matched = true;
        break;
      }
    }

    // Safety fallback
    if (!matched) {
      nodes.push(remaining[0]);
      remaining = remaining.substring(1);
      keyIndex++;
    }
  }

  return nodes;
}
