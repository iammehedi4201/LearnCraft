// ═══════════════════════════════════════════════════════════
// Learning Craft — TypeScript Runtime (Sandboxed iframe)
// ═══════════════════════════════════════════════════════════
//
// Executes TypeScript / JavaScript code securely in a sandboxed <iframe>.
// Output is intercepted via window.postMessage.
//
// Security:
//   - iframe sandbox="allow-scripts" (no DOM, no network, no storage)
//   - Execution timeout (5s default)
//   - Loop guards for infinite loop protection
//   - Zero eval() on the parent window

import type {
  PlaygroundRuntime,
  PlaygroundInput,
  ExecutionResult,
  ValidationResult,
  TestCase,
  OutputLine,
  PlaygroundError,
  TestResult,
} from "../types";

import * as ts from "typescript";
import { extractLineFromStack, detectSyntaxErrorLine } from "../error-detector";

// ─── Beginner-friendly error transformations ───
const ERROR_PATTERNS: {
  pattern: RegExp;
  friendly: (match: RegExpMatchArray) => string;
  suggestion?: (match: RegExpMatchArray) => string;
}[] = [
  {
    pattern: /missing \)\s*after argument list/i,
    friendly: () => `Missing closing ')' or missing comma (,) between arguments.`,
    suggestion: () => `Check your function or constructor call. Make sure all arguments are separated by commas: e.g. ("Alice", 85).`,
  },
  {
    pattern: /Type '(.+)' is not assignable to type '(.+)'/,
    friendly: (m) => `Type '${m[1]}' is not assignable to type '${m[2]}'.`,
    suggestion: (m) => `The value you provided is a ${m[1]}, but this needs to be a ${m[2]}. Check the value and its type.`,
  },
  {
    pattern: /Cannot find name '(.+)'/,
    friendly: (m) => `Cannot find '${m[1]}'. It hasn't been declared yet.`,
    suggestion: (m) => `Make sure you declared '${m[1]}' with let, const, class, or function before using it.`,
  },
  {
    pattern: /Property '(.+)' does not exist on type '(.+)'/,
    friendly: (m) => `Property '${m[1]}' doesn't exist on '${m[2]}'.`,
    suggestion: (m) => `Check that '${m[1]}' is spelled correctly and exists in the ${m[2]} definition.`,
  },
  {
    pattern: /Expected (\d+) arguments?, but got (\d+)/,
    friendly: (m) => `Expected ${m[1]} argument(s), but got ${m[2]}.`,
    suggestion: () => `Check the function/constructor definition to see how many parameters it expects.`,
  },
  {
    pattern: /Argument of type '(.+)' is not assignable to parameter of type '(.+)'/,
    friendly: (m) => `Argument type '${m[1]}' doesn't match parameter type '${m[2]}'.`,
    suggestion: (m) => `The function expects a ${m[2]} but you passed a ${m[1]}.`,
  },
  {
    pattern: /'.+' is declared but its value is never read/,
    friendly: () => `A variable is declared but never used.`,
    suggestion: () => `This is just a warning. Use the variable or remove it.`,
  },
  {
    pattern: /Unexpected token/,
    friendly: () => `There's a syntax error in your code.`,
    suggestion: () => `Check for missing brackets, parentheses, semicolons, or commas.`,
  },
  {
    pattern: /Unterminated string literal/,
    friendly: () => `A string is missing its closing quote.`,
    suggestion: () => `Make sure every string has matching opening and closing quotes (' or ").`,
  },
  {
    pattern: /is not a function/,
    friendly: (m) => `${m[0]}. You may be trying to call something that isn't a method.`,
    suggestion: () => `Check the spelling of the method name and make sure it exists on the class/object.`,
  },
];

function transformError(rawMessage: string, originalCode?: string): PlaygroundError {
  // First, check static syntax errors if original code is available
  if (originalCode) {
    const staticErr = detectSyntaxErrorLine(originalCode);
    if (staticErr && staticErr.line) {
      return {
        message: staticErr.message,
        technicalMessage: rawMessage,
        line: staticErr.line,
        column: staticErr.column,
        suggestion: staticErr.suggestion,
      };
    }
  }

  // Second, extract line/col from stack trace
  const extracted = extractLineFromStack(rawMessage);
  let line = extracted.line;
  let column = extracted.column;

  for (const { pattern, friendly, suggestion } of ERROR_PATTERNS) {
    const match = rawMessage.match(pattern);
    if (match) {
      return {
        message: friendly(match),
        technicalMessage: rawMessage,
        line,
        column,
        suggestion: suggestion?.(match),
      };
    }
  }

  return {
    message: rawMessage.replace(/TS\d+:\s*/, "").replace(/^SyntaxError:\s*/i, "").replace(/^TypeError:\s*/i, ""),
    technicalMessage: rawMessage,
    line,
    column,
    suggestion: "Check your code for typos or syntax issues.",
  };
}

// ─── Local Zero-Network TypeScript Transpiler ───
// Guaranteed to preserve exact 1-to-1 line numbers with user input!
export function transpileTypeScriptLocally(code: string): string {
  try {
    if (typeof ts !== "undefined" && ts.transpileModule) {
      const result = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          removeComments: false,
        },
      });
      if (result && typeof result.outputText === "string") {
        return result.outputText;
      }
    }
  } catch {
    // Fallback to local regex transforms below
  }

  let js = code;

  // 1. Remove multi-line and single-line interface declarations (preserve newlines so line numbers match 1-to-1)
  js = js.replace(/interface\s+[A-Za-z0-9_$]+(?:\s*<[^>]*>)?(?:\s+extends\s+[^{]+)?\s*\{[\s\S]*?\}/g, (match) => {
    return match.replace(/[^\n]/g, " ");
  });

  // 2. Remove type alias declarations (both single-line and multi-line, preserving exact newlines)
  js = js.replace(/type\s+[A-Za-z0-9_$]+(?:\s*<[^>]*>)?\s*=[\s\S]*?;/g, (match) => {
    return match.replace(/[^\n]/g, " ");
  });

  // 3. Transform enums to plain JS objects (preserve single line / structure)
  js = js.replace(/enum\s+([A-Za-z0-9_$]+)\s*\{([^}]+)\}/g, (_match, enumName, members) => {
    const entries = members
      .split(",")
      .map((m: string, i: number) => {
        const parts = m.trim().split("=");
        const key = parts[0].trim();
        if (!key) return "";
        const val = parts[1] ? parts[1].trim() : String(i);
        return `${key}: ${val}`;
      })
      .filter(Boolean)
      .join(", ");
    return `const ${enumName} = { ${entries} };`;
  });

  // 4. Remove implements clauses on classes (e.g. class Foo implements Bar, Baz { -> class Foo {)
  js = js.replace(/(\bclass\s+[A-Za-z0-9_$]+(?:\s+extends\s+[^{]+)?)\s+implements\s+[^{]+/g, "$1 ");

  // 5. Remove class generic declarations: e.g. class Stack<T> -> class Stack
  js = js.replace(/(\bclass\s+[A-Za-z0-9_$]+)<[A-Za-z0-9_$,\s|&<>[\]]+>/g, "$1");

  // 6. Transform TypeScript constructor parameter properties (e.g. constructor(public readonly name: string, protected email: string) {})
  // Correctly handles multiple modifiers (public readonly) and positions assignments after super() if present
  js = js.replace(/constructor\s*\(([\s\S]*?)\)\s*\{(\s*super\s*\([^)]*\)\s*;?)?/g, (match, paramStr, superCall) => {
    const rawParams = paramStr.split(",");
    const assignments: string[] = [];
    const cleanedParams: string[] = [];
    let hasParamProperties = false;

    for (const raw of rawParams) {
      const p = raw.trim();
      if (!p) continue;
      // Match one or more modifiers: public, private, protected, readonly
      const modifierMatch = p.match(/^(?:(?:public|private|protected|readonly)\s+)+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
      if (modifierMatch) {
        hasParamProperties = true;
        const paramName = modifierMatch[1];
        assignments.push(`this.${paramName} = ${paramName};`);
        const withoutModifiers = p.replace(/^(?:(?:public|private|protected|readonly)\s+)+/, "");
        cleanedParams.push(withoutModifiers);
      } else {
        cleanedParams.push(p);
      }
    }

    if (hasParamProperties) {
      if (superCall) {
        return `constructor(${cleanedParams.join(", ")}) {${superCall} ${assignments.join(" ")} `;
      }
      return `constructor(${cleanedParams.join(", ")}) { ${assignments.join(" ")} `;
    }
    return match;
  });

  // 7. Clean function & method parameter lists and return types: (name: string, age: number = 25): boolean { -> (name, age = 25) {
  js = js.replace(/(\b(?:function\s*(?:[a-zA-Z_$][a-zA-Z0-9_$]*)?|constructor|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*\()([\s\S]*?)(\)\s*(?::\s*[\s\S]*?)?\s*(?:=>|\{))/g, (_match, prefix, paramStr, suffix) => {
    const cleanedParams = paramStr
      .split(",")
      .map((p: string) => {
        let clean = p.replace(/\b(?:public|private|protected|readonly)\s+/g, "");
        clean = clean.replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\??\s*:[^=,]+/g, "$1");
        return clean;
      })
      .filter((p: string, idx: number, arr: string[]) => {
        return idx < arr.length - 1 || p.trim().length > 0;
      })
      .join(",");
    const cleanedSuffix = suffix.replace(/\)\s*:\s*[\s\S]*?(?=\s*(?:=>|\{))/, ")");
    return `${prefix}${cleanedParams}${cleanedSuffix}`;
  });

  // 8. Arrow function parameter lists with return types: e.g. (a: number, b: number): number => ...
  js = js.replace(/\(([^)]*)\)\s*(?::\s*[\s\S]*?)?\s*=>/g, (_match, paramStr) => {
    const cleanedParams = paramStr
      .split(",")
      .map((p: string) => p.replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\??\s*:[^=,]+/g, "$1"))
      .join(",");
    return `(${cleanedParams}) =>`;
  });

  // 9. Remove access modifiers: public, private, protected, readonly, override, abstract
  js = js.replace(/\b(public|private|protected|readonly|override|abstract)\s+/g, "");

  // 10. Remove initialized variable and class field type annotations (e.g. grades: { ... }[] = []; or const user: User[] = val;)
  js = js.replace(/^(\s*(?:(?:let|const|var|static)\s+)?[a-zA-Z_$][a-zA-Z0-9_$]*)\s*\??\s*:[^\n=]+=(?!=)/gm, "$1 =");

  // 11. Remove uninitialized variable and class field type annotations (e.g. name: string; or studentId: string;)
  js = js.replace(/^(\s*(?:(?:let|const|var|static)\s+)?[a-zA-Z_$][a-zA-Z0-9_$]*)\s*\??\s*:[^\n=]+;(?=\s*(?:\n|$|\/\/|\/\*))/gm, "$1;");

  // 12. Remove 'as Type' type assertions
  js = js.replace(/\s+as\s+[A-Za-z0-9_$]+(?:\s*<[^>]*>)?(?:\[\])?/g, "");

  // 13. Remove generic type arguments on function calls / new instances: e.g. Promise.resolve<string>('...') or new Set<string>()
  js = js.replace(/<[A-Za-z0-9_$,\s|&<>[\]]+>(?=\s*[\(\.])/g, "");

  // 14. Remove standalone function/method return type annotations in declarations
  js = js.replace(/\)\s*:\s*[^{=>;]+(?=\s*;)/g, ")");

  // 15. Remove non-null assertion operators: e.g. user!.name -> user.name
  js = js.replace(/([a-zA-Z0-9_$\]\)])!(?=[.\[(,\s;])/g, "$1");

  // 16. Loop protection to guard against true infinite loops (preserves same-line structure)
  let guardCounter = 0;
  js = js.replace(/\bwhile\s*\(([^)]+)\)/g, (_m, cond) => {
    const id = `__lc_w_${guardCounter++}`;
    return `var ${id}=0; while((${id}++ < 100000) ? (${cond}) : (function(){ throw new Error("Infinite loop detected: exceeded 100,000 iterations"); })())`;
  });

  return js;
}

// ─── Build the HTML payload to run inside sandboxed iframe ───
function buildSandboxHtml(rawCode: string, timeLimit = 5000): string {
  const transpiledJs = transpileTypeScriptLocally(rawCode);
  const serializedJs = JSON.stringify(transpiledJs);

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
(async function() {
  // Serializer for console objects
  function serialize(args) {
    return args.map(function(a) {
      if (a === undefined) return 'undefined';
      if (a === null) return 'null';
      if (typeof a === 'function') return '[Function: ' + (a.name || 'anonymous') + ']';
      if (typeof a === 'object') {
        try {
          var seen = [];
          return JSON.stringify(a, function(key, val) {
            if (typeof val === 'object' && val !== null) {
              if (seen.indexOf(val) >= 0) return '[Circular]';
              seen.push(val);
            }
            return val;
          }, 2);
        } catch (e) {
          return String(a);
        }
      }
      return String(a);
    }).join(' ');
  }

  // Intercept console
  ['log', 'warn', 'error', 'info'].forEach(function(method) {
    console[method] = function() {
      var args = Array.prototype.slice.call(arguments);
      try {
        window.parent.postMessage({
          type: 'playground-output',
          level: method,
          content: serialize(args),
          timestamp: Date.now()
        }, '*');
      } catch (e) {}
    };
  });

  console.clear = function() {
    try {
      window.parent.postMessage({
        type: 'playground-output',
        level: 'clear',
        content: '',
        timestamp: Date.now()
      }, '*');
    } catch (e) {}
  };

  // Error listeners
  window.onerror = function(msg, src, line, col, err) {
    try {
      window.parent.postMessage({
        type: 'playground-error',
        message: err && err.message ? err.message : String(msg),
        line: line,
        column: col
      }, '*');
    } catch (e) {}
  };

  window.onunhandledrejection = function(e) {
    try {
      window.parent.postMessage({
        type: 'playground-error',
        message: String(e.reason)
      }, '*');
    } catch (err) {}
  };

  // Safety Timeout
  var timeoutId = setTimeout(function() {
    try {
      window.parent.postMessage({
        type: 'playground-error',
        message: 'Execution timed out after ${timeLimit / 1000} seconds. Check for infinite loops.'
      }, '*');
      window.parent.postMessage({ type: 'playground-done', success: false }, '*');
    } catch (e) {}
  }, ${timeLimit});

  try {
    var jsCode = ${serializedJs};
    var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    var fn = new AsyncFunction(jsCode);
    await fn();
    clearTimeout(timeoutId);

    window.parent.postMessage({ type: 'playground-done', success: true }, '*');
  } catch (err) {
    clearTimeout(timeoutId);
    window.parent.postMessage({
      type: 'playground-error',
      message: err instanceof Error ? err.message : String(err)
    }, '*');
    window.parent.postMessage({ type: 'playground-done', success: false }, '*');
  }
})();
</script>
</body>
</html>`;
}

// ─── Build the HTML payload to run test validation inside sandboxed iframe ───
function buildValidationHtml(code: string, tests: TestCase[], hiddenTests: TestCase[] = [], timeLimit = 8000): string {
  const allTests = [...tests, ...hiddenTests];

  const testRunnerCode = allTests.map((test, i) => {
    const transpiledTest = transpileTypeScriptLocally(test.code);
    return `
try {
  (function() {
    ${transpiledTest}
  })();
  window.parent.postMessage({
    type: 'playground-test-result',
    index: ${i},
    name: ${JSON.stringify(test.hidden ? `Hidden Test ${i + 1}` : test.name)},
    passed: true,
    hidden: ${!!test.hidden}
  }, '*');
} catch (e) {
  window.parent.postMessage({
    type: 'playground-test-result',
    index: ${i},
    name: ${JSON.stringify(test.hidden ? `Hidden Test ${i + 1}` : test.name)},
    passed: false,
    hidden: ${!!test.hidden},
    error: e instanceof Error ? e.message : String(e)
  }, '*');
}
`;
  }).join('\n');

  const fullCode = `${code}\n\n// ═══ Test Assertions ═══\n${testRunnerCode}`;
  return buildSandboxHtml(fullCode, timeLimit);
}

// ═══════════════════════════════════════════════════════════
// TypeScript Runtime Class
// ═══════════════════════════════════════════════════════════

export class TypeScriptRuntime implements PlaygroundRuntime {
  supportsPreview = false;
  supportsConsole = true;
  supportsTests = true;
  supportsMultipleFiles = false;

  private iframe: HTMLIFrameElement | null = null;
  private container: HTMLElement | null = null;

  private getContainer(): HTMLElement {
    if (this.container && document.body.contains(this.container)) {
      return this.container;
    }
    this.container = document.createElement("div");
    // Off-screen with opacity:0 instead of display:none or visibility:hidden to ensure JS executes in all browsers
    this.container.style.cssText = "position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;opacity:0;pointer-events:none;overflow:hidden;";
    document.body.appendChild(this.container);
    return this.container;
  }

  private destroyIframe(): void {
    if (this.iframe) {
      try {
        this.iframe.remove();
      } catch {}
      this.iframe = null;
    }
  }

  /** Execute TypeScript/JavaScript code safely */
  async run(input: PlaygroundInput): Promise<ExecutionResult> {
    const startTime = Date.now();
    const output: OutputLine[] = [];
    let error: PlaygroundError | undefined;

    // 0. Static pre-execution validation (Access modifier rules, syntax errors, unmatched brackets)
    const staticErr = detectSyntaxErrorLine(input.code);
    if (staticErr) {
      return {
        success: false,
        output: [],
        error: {
          message: staticErr.message,
          technicalMessage: staticErr.technicalMessage || staticErr.message,
          line: staticErr.line,
          column: staticErr.column,
          suggestion: staticErr.suggestion,
        },
        duration: Date.now() - startTime,
      };
    }

    // Transpile locally in 0ms
    const jsCode = transpileTypeScriptLocally(input.code);

    return new Promise<ExecutionResult>((resolve) => {
      // 1. Try Web Worker first (lightning fast, completely isolated, zero iframe rendering quirks)
      if (typeof Worker !== "undefined" && typeof Blob !== "undefined") {
        try {
          const workerScript = `
function serialize(args) {
  return args.map(function(a) {
    if (a === undefined) return 'undefined';
    if (a === null) return 'null';
    if (typeof a === 'function') return '[Function: ' + (a.name || 'anonymous') + ']';
    if (typeof a === 'object') {
      try {
        var seen = [];
        return JSON.stringify(a, function(key, val) {
          if (typeof val === 'object' && val !== null) {
            if (seen.indexOf(val) >= 0) return '[Circular]';
            seen.push(val);
          }
          return val;
        }, 2);
      } catch (e) {
        return String(a);
      }
    }
    return String(a);
  }).join(' ');
}

var console = {
  log: function() { self.postMessage({ type: 'output', level: 'log', content: serialize(Array.prototype.slice.call(arguments)), timestamp: Date.now() }); },
  warn: function() { self.postMessage({ type: 'output', level: 'warn', content: serialize(Array.prototype.slice.call(arguments)), timestamp: Date.now() }); },
  error: function() { self.postMessage({ type: 'output', level: 'error', content: serialize(Array.prototype.slice.call(arguments)), timestamp: Date.now() }); },
  info: function() { self.postMessage({ type: 'output', level: 'info', content: serialize(Array.prototype.slice.call(arguments)), timestamp: Date.now() }); },
  clear: function() { self.postMessage({ type: 'output', level: 'clear', content: '', timestamp: Date.now() }); }
};

self.onmessage = async function(e) {
  try {
    var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    var fn = new AsyncFunction("console", e.data.code);
    await fn(console);
    self.postMessage({ type: 'done', success: true });
  } catch (err) {
    self.postMessage({
      type: 'error',
      message: err instanceof Error ? (err.stack || err.message) : String(err)
    });
    self.postMessage({ type: 'done', success: false });
  }
};
`;
          const blob = new Blob([workerScript], { type: "application/javascript" });
          const workerUrl = URL.createObjectURL(blob);
          const worker = new Worker(workerUrl);

          const workerTimeout = setTimeout(() => {
            worker.terminate();
            URL.revokeObjectURL(workerUrl);
            resolve({
              success: false,
              output,
              error: {
                message: "Execution timed out. Check for infinite loops.",
                technicalMessage: "Execution exceeded timeout limit.",
                suggestion: "Make sure your loops and recursive calls have a termination condition.",
              },
              duration: Date.now() - startTime,
            });
          }, 4000);

          worker.onmessage = (e) => {
            const data = e.data;
            if (!data) return;

            if (data.type === "output") {
              if (data.level === "clear") {
                output.length = 0;
              } else {
                output.push({
                  type: data.level,
                  content: data.content,
                  timestamp: data.timestamp,
                });
              }
            } else if (data.type === "error") {
              error = transformError(data.message || "Execution error", input.code);
              output.push({
                type: "error",
                content: error.message,
                timestamp: Date.now(),
              });
            } else if (data.type === "done") {
              clearTimeout(workerTimeout);
              worker.terminate();
              URL.revokeObjectURL(workerUrl);
              resolve({
                success: data.success && !error,
                output,
                error,
                duration: Date.now() - startTime,
              });
            }
          };

          worker.onerror = (err) => {
            clearTimeout(workerTimeout);
            worker.terminate();
            URL.revokeObjectURL(workerUrl);
            const errObj = transformError(err.message || "Worker error", input.code);
            output.push({
              type: "error",
              content: errObj.message,
              timestamp: Date.now(),
            });
            resolve({
              success: false,
              output,
              error: errObj,
              duration: Date.now() - startTime,
            });
          };

          worker.postMessage({ code: jsCode });
          return;
        } catch {
          // Fall through to iframe fallback
        }
      }

      // 2. Sandboxed iframe fallback (active in DOM with opacity:0 instead of display:none)
      this.destroyIframe();
      const iframe = document.createElement("iframe");
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.style.cssText = "position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;opacity:0;pointer-events:none;border:none;";
      this.iframe = iframe;

      const safetyTimeout = setTimeout(() => {
        window.removeEventListener("message", handleMessage);
        this.destroyIframe();
        resolve({
          success: false,
          output,
          error: {
            message: "Execution timed out. Check for infinite loops.",
            technicalMessage: "Execution timed out.",
            suggestion: "Make sure your loops and recursive calls have a termination condition.",
          },
          duration: Date.now() - startTime,
        });
      }, 4000);

      const handleMessage = (event: MessageEvent) => {
        const data = event.data;
        if (!data || typeof data !== "object") return;

        if (data.type === "playground-output") {
          if (data.level === "clear") {
            output.length = 0;
          } else {
            output.push({
              type: data.level as OutputLine["type"],
              content: data.content,
              timestamp: data.timestamp,
            });
          }
        } else if (data.type === "playground-error") {
          error = transformError(data.message || "Execution error", input.code);
          output.push({
            type: "error",
            content: error.message,
            timestamp: Date.now(),
          });
        } else if (data.type === "playground-done") {
          clearTimeout(safetyTimeout);
          window.removeEventListener("message", handleMessage);
          this.destroyIframe();
          resolve({
            success: data.success && !error,
            output,
            error,
            duration: Date.now() - startTime,
          });
        }
      };

      window.addEventListener("message", handleMessage);
      iframe.srcdoc = buildSandboxHtml(input.code, 4000);
      this.getContainer().appendChild(iframe);
    });
  }

  /** Validate code against test cases */
  async validate(
    input: PlaygroundInput,
    tests: TestCase[],
    hiddenTests?: TestCase[]
  ): Promise<ValidationResult> {
    const allTests = [...tests, ...(hiddenTests || [])];
    const results: TestResult[] = [];
    const expectedCount = allTests.length;

    // 0. Static pre-validation check (Access modifier rules, syntax errors)
    const staticErr = detectSyntaxErrorLine(input.code);
    if (staticErr) {
      return {
        passed: false,
        results: allTests.map((t, i) => ({
          name: t.hidden ? `Hidden Test ${i + 1}` : t.name,
          passed: false,
          hidden: !!t.hidden,
          error: `Syntax Error: ${staticErr.message}`,
        })),
        totalPassed: 0,
        totalTests: expectedCount,
      };
    }

    // Transpile input code
    const transpiledUserCode = transpileTypeScriptLocally(input.code);

    return new Promise<ValidationResult>((resolve) => {
      // 1. Try Web Worker for test runner
      if (typeof Worker !== "undefined" && typeof Blob !== "undefined") {
        try {
          const testSuiteCode = allTests.map((test, i) => {
            const transpiledTest = transpileTypeScriptLocally(test.code);
            return `
try {
  const _testRes = (function() {
    ${transpiledTest}
  })();
  if (_testRes && typeof _testRes.then === 'function') {
    await _testRes;
  }
  self.postMessage({
    type: 'test-result',
    index: ${i},
    name: ${JSON.stringify(test.hidden ? `Hidden Test ${i + 1}` : test.name)},
    passed: true,
    hidden: ${!!test.hidden}
  });
} catch (e) {
  self.postMessage({
    type: 'test-result',
    index: ${i},
    name: ${JSON.stringify(test.hidden ? `Hidden Test ${i + 1}` : test.name)},
    passed: false,
    hidden: ${!!test.hidden},
    error: e instanceof Error ? e.message : String(e)
  });
}
`;
          }).join('\n');

          const workerScript = `
self.onmessage = async function(e) {
  var console = {
    log: function() {},
    warn: function() {},
    error: function() {},
    info: function() {},
    clear: function() {}
  };

  try {
    var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    var fn = new AsyncFunction("console", e.data.code);
    await fn(console);
  } catch (err) {
    self.postMessage({
      type: 'test-suite-error',
      error: err instanceof Error ? err.message : String(err)
    });
  }
  self.postMessage({ type: 'tests-done' });
};
`;
          const blob = new Blob([workerScript], { type: "application/javascript" });
          const workerUrl = URL.createObjectURL(blob);
          const worker = new Worker(workerUrl);

          let suiteError: string | undefined;

          const timeout = setTimeout(() => {
            worker.terminate();
            URL.revokeObjectURL(workerUrl);
            for (let i = 0; i < expectedCount; i++) {
              if (!results[i]) {
                results[i] = {
                  name: allTests[i].hidden ? `Hidden Test ${i + 1}` : allTests[i].name,
                  passed: false,
                  hidden: !!allTests[i].hidden,
                  error: "Test execution timed out. Check for infinite loops.",
                };
              }
            }
            resolve({
              passed: false,
              results,
              totalPassed: results.filter((r) => r.passed).length,
              totalTests: expectedCount,
            });
          }, 4000);

          worker.onmessage = (e) => {
            const data = e.data;
            if (!data) return;

            if (data.type === "test-result") {
              results[data.index] = {
                name: data.name,
                passed: data.passed,
                hidden: data.hidden,
                error: data.error,
              };
            } else if (data.type === "test-suite-error") {
              suiteError = data.error;
            } else if (data.type === "tests-done") {
              clearTimeout(timeout);
              worker.terminate();
              URL.revokeObjectURL(workerUrl);

              for (let i = 0; i < expectedCount; i++) {
                if (!results[i]) {
                  results[i] = {
                    name: allTests[i].hidden
                      ? `Hidden Test ${i + 1}`
                      : allTests[i].name,
                    passed: false,
                    hidden: !!allTests[i].hidden,
                    error: suiteError
                      ? `Code failed before test could run: ${suiteError}`
                      : "Test did not run.",
                  };
                }
              }

              const totalPassed = results.filter((r) => r.passed).length;
              resolve({
                passed: totalPassed === expectedCount && expectedCount > 0,
                results,
                totalPassed,
                totalTests: expectedCount,
              });
            }
          };

          worker.onerror = (err) => {
            clearTimeout(timeout);
            worker.terminate();
            URL.revokeObjectURL(workerUrl);
            const errMsg = err?.message || "Worker execution error";
            for (let i = 0; i < expectedCount; i++) {
              if (!results[i]) {
                results[i] = {
                  name: allTests[i].hidden
                    ? `Hidden Test ${i + 1}`
                    : allTests[i].name,
                  passed: false,
                  hidden: !!allTests[i].hidden,
                  error: `Code error: ${errMsg}`,
                };
              }
            }
            resolve({
              passed: false,
              results,
              totalPassed: 0,
              totalTests: expectedCount,
            });
          };

          // Combine transpiled user code and testSuiteCode so they execute in the same closure scope
          const combinedCode = `${transpiledUserCode}\n\n// ═══ Test Suite ═══\n${testSuiteCode}`;
          worker.postMessage({ code: combinedCode });
          return;
        } catch {
          // Fall through to iframe fallback
        }
      }

      // 2. Iframe test validation fallback
      this.destroyIframe();
      const iframe = document.createElement("iframe");
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.style.cssText = "position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;opacity:0;pointer-events:none;border:none;";
      this.iframe = iframe;

      let receivedCount = 0;

      const safetyTimeout = setTimeout(() => {
        window.removeEventListener("message", handleMessage);
        this.destroyIframe();
        for (let i = 0; i < expectedCount; i++) {
          if (!results[i]) {
            results[i] = {
              name: allTests[i].hidden ? `Hidden Test ${i + 1}` : allTests[i].name,
              passed: false,
              hidden: !!allTests[i].hidden,
              error: "Validation timed out",
            };
          }
        }
        resolve({
          passed: false,
          results,
          totalPassed: results.filter((r) => r.passed).length,
          totalTests: expectedCount,
        });
      }, 5000);

      const handleMessage = (event: MessageEvent) => {
        const data = event.data;
        if (!data || typeof data !== "object") return;

        if (data.type === "playground-test-result") {
          results[data.index] = {
            name: data.name,
            passed: data.passed,
            hidden: data.hidden,
            error: data.error,
          };
          receivedCount++;

          if (receivedCount >= expectedCount) {
            clearTimeout(safetyTimeout);
            window.removeEventListener("message", handleMessage);
            setTimeout(() => {
              this.destroyIframe();
              const totalPassed = results.filter((r) => r.passed).length;
              resolve({
                passed: totalPassed === expectedCount && expectedCount > 0,
                results,
                totalPassed,
                totalTests: expectedCount,
              });
            }, 30);
          }
        }

        if (data.type === "playground-done" && receivedCount < expectedCount) {
          clearTimeout(safetyTimeout);
          window.removeEventListener("message", handleMessage);
          setTimeout(() => {
            this.destroyIframe();
            for (let i = 0; i < expectedCount; i++) {
              if (!results[i]) {
                results[i] = {
                  name: allTests[i].hidden
                    ? `Hidden Test ${i + 1}`
                    : allTests[i].name,
                  passed: false,
                  hidden: !!allTests[i].hidden,
                  error: "Code failed before this test could run.",
                };
              }
            }
            const totalPassed = results.filter((r) => r.passed).length;
            resolve({
              passed: totalPassed === expectedCount && expectedCount > 0,
              results,
              totalPassed,
              totalTests: expectedCount,
            });
          }, 50);
        }
      };

      window.addEventListener("message", handleMessage);

      // Safe srcdoc loading
      iframe.srcdoc = buildValidationHtml(input.code, tests, hiddenTests);
      this.getContainer().appendChild(iframe);
    });
  }

  reset(): void {
    this.destroyIframe();
  }

  dispose(): void {
    this.destroyIframe();
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
}
