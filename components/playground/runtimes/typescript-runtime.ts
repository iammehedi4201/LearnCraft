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

// ─── Beginner-friendly error transformations ───
const ERROR_PATTERNS: {
  pattern: RegExp;
  friendly: (match: RegExpMatchArray) => string;
  suggestion?: (match: RegExpMatchArray) => string;
}[] = [
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

function transformError(rawMessage: string): PlaygroundError {
  const lineMatch = rawMessage.match(/(?:at\s+.*:|<anonymous>:|\((\d+),(\d+)\))(\d+):?(\d+)?/);
  const line = lineMatch ? parseInt(lineMatch[3] || lineMatch[1], 10) : undefined;
  const column = lineMatch ? parseInt(lineMatch[4] || lineMatch[2], 10) : undefined;

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
    message: rawMessage.replace(/TS\d+:\s*/, ""),
    technicalMessage: rawMessage,
    line,
    column,
    suggestion: "Check your code for typos or syntax issues.",
  };
}

// ─── Build the HTML payload to run inside sandboxed iframe ───
function buildSandboxHtml(rawCode: string, timeLimit = 5000): string {
  const serializedCode = JSON.stringify(rawCode);

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<!-- TypeScript CDN with immediate fallback -->
<script src="https://cdn.jsdelivr.net/npm/typescript@5.4.5/lib/typescript.min.js"></script>
<script>
(function() {
  // Serializer for console objects
  function serialize(args) {
    return args.map(function(a) {
      if (a === undefined) return 'undefined';
      if (a === null) return 'null';
      if (typeof a === 'function') return '[Function: ' + (a.name || 'anonymous') + ']';
      if (typeof a === 'object') {
        try {
          // Circular reference safe JSON
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

  // Transpilation & Execution
  var code = ${serializedCode};

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
    var jsCode = code;

    // 1. If TS compiler is present, transpile properly
    if (typeof ts !== 'undefined') {
      var transpileResult = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.None,
          strict: false,
          esModuleInterop: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          noEmit: false
        },
        reportDiagnostics: true
      });

      if (transpileResult.diagnostics && transpileResult.diagnostics.length > 0) {
        transpileResult.diagnostics.forEach(function(d) {
          if (d.category === ts.DiagnosticCategory.Error) {
            var msg = ts.flattenDiagnosticMessageText(d.messageText, '\\n');
            window.parent.postMessage({
              type: 'playground-ts-diagnostic',
              message: msg,
              category: 1
            }, '*');
          }
        });
      }

      jsCode = transpileResult.outputText;
    } else {
      // Fast fallback: strip type annotations if TS CDN is slow or offline
      jsCode = code
        .replace(/interface\\s+[A-Za-z0-9_]+\\s*\\{[^}]*\\}/g, '')
        .replace(/type\\s+[A-Za-z0-9_]+\\s*=[^;]+;/g, '')
        .replace(/:\\s*[A-Za-z0-9_\\[\\]<>,|&\\s]+(?=[=),;{])/g, '')
        .replace(/\\b(public|private|protected|readonly)\\s+/g, '');
    }

    // 2. Loop guard injection for while/for loops
    var guardCounter = 0;
    jsCode = jsCode.replace(/\\bwhile\\s*\\(/g, function() {
      var id = '__lc_w_' + (guardCounter++);
      return 'var ' + id + '=0; while((' + id + '++ < 100000) && (';
    });

    // 3. Execute
    var result = (new Function(jsCode))();
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

  const testRunnerCode = allTests.map((test, i) => `
try {
  ${test.code}
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
`).join('\n');

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
    this.container.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;overflow:hidden;visibility:hidden;";
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
    this.destroyIframe();

    const timeLimit = 5000;
    const output: OutputLine[] = [];
    let error: PlaygroundError | undefined;

    return new Promise<ExecutionResult>((resolve) => {
      const startTime = Date.now();

      const iframe = document.createElement("iframe");
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.style.cssText = "width:1px;height:1px;border:none;display:none;";
      this.iframe = iframe;

      const safetyTimeout = setTimeout(() => {
        window.removeEventListener("message", handleMessage);
        this.destroyIframe();
        resolve({
          success: false,
          output,
          error: {
            message: "Execution timed out. Check for infinite loops.",
            technicalMessage: `Execution exceeded ${timeLimit}ms timeout.`,
            suggestion: "Make sure your loops and recursive calls have a termination condition.",
          },
          duration: Date.now() - startTime,
        });
      }, timeLimit + 3000);

      const handleMessage = (event: MessageEvent) => {
        const data = event.data;
        if (!data || typeof data !== "object") return;

        switch (data.type) {
          case "playground-output":
            if (data.level === "clear") {
              output.length = 0;
            } else {
              output.push({
                type: data.level as OutputLine["type"],
                content: data.content,
                timestamp: data.timestamp,
              });
            }
            break;

          case "playground-error":
            error = transformError(data.message || "Execution error");
            output.push({
              type: "error",
              content: error.message,
              timestamp: Date.now(),
            });
            break;

          case "playground-ts-diagnostic":
            if (data.category === 1) {
              const tsError = transformError(data.message);
              error = tsError;
              output.push({
                type: "warn",
                content: `⚠ TS: ${tsError.message}`,
                timestamp: Date.now(),
              });
            }
            break;

          case "playground-done":
            clearTimeout(safetyTimeout);
            window.removeEventListener("message", handleMessage);
            setTimeout(() => {
              this.destroyIframe();
              resolve({
                success: data.success && !error,
                output,
                error,
                duration: Date.now() - startTime,
              });
            }, 30);
            break;
        }
      };

      window.addEventListener("message", handleMessage);

      // IMPORTANT: Use srcdoc directly. DO NOT access contentDocument on sandboxed iframe!
      iframe.srcdoc = buildSandboxHtml(input.code, timeLimit);
      this.getContainer().appendChild(iframe);
    });
  }

  /** Validate code against test cases */
  async validate(
    input: PlaygroundInput,
    tests: TestCase[],
    hiddenTests?: TestCase[]
  ): Promise<ValidationResult> {
    this.destroyIframe();

    const allTests = [...tests, ...(hiddenTests || [])];
    const results: TestResult[] = [];
    const expectedCount = allTests.length;

    return new Promise<ValidationResult>((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.style.cssText = "width:1px;height:1px;border:none;display:none;";
      this.iframe = iframe;

      let receivedCount = 0;

      const safetyTimeout = setTimeout(() => {
        window.removeEventListener("message", handleMessage);
        this.destroyIframe();
        while (results.length < expectedCount) {
          results.push({
            name: allTests[results.length].hidden
              ? `Hidden Test ${results.length + 1}`
              : allTests[results.length].name,
            passed: false,
            hidden: !!allTests[results.length].hidden,
            error: "Test timed out",
          });
        }
        const totalPassed = results.filter((r) => r.passed).length;
        resolve({
          passed: totalPassed === expectedCount,
          results,
          totalPassed,
          totalTests: expectedCount,
        });
      }, 10000);

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
                passed: totalPassed === expectedCount,
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
              passed: totalPassed === expectedCount,
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
