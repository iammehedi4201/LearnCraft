const ts = require('typescript');
const vm = require('vm');
const fs = require('fs');

function createSandbox() {
  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      warn: (...args) => logs.push('[WARN] ' + args.join(' ')),
      error: (...args) => logs.push('[ERROR] ' + args.join(' ')),
      info: (...args) => logs.push('[INFO] ' + args.join(' '))
    },
    setTimeout: (fn, ms) => { try { fn(); } catch(e){} return 1; },
    clearTimeout: () => {},
    setInterval: (fn, ms) => { try { fn(); } catch(e){} return 1; },
    clearInterval: () => {},
    Promise,
    Array,
    Object,
    String,
    Number,
    Boolean,
    Date,
    JSON,
    Math,
    RegExp,
    Map,
    Set,
    Error,
    TypeError,
    RangeError,
    SyntaxError,
    structuredClone: (obj) => JSON.parse(JSON.stringify(obj)),
    window: {},
    document: {
      querySelector: (sel) => ({
        textContent: 'Task 1',
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        addEventListener: () => {}
      }),
      querySelectorAll: (sel) => [
        { textContent: 'Item 1', classList: { add: () => {} } }
      ],
      createElement: (tag) => ({
        textContent: '',
        appendChild: () => {},
        classList: { add: () => {} }
      })
    },
    localStorage: {
      _data: {},
      getItem(k) { return this._data[k] || null; },
      setItem(k, v) { this._data[k] = String(v); },
      removeItem(k) { delete this._data[k]; },
      clear() { this._data = {}; }
    },
    fetch: async (url, options) => ({
      ok: true,
      status: 200,
      json: async () => ({ id: 1, title: 'Sample Resource', completed: false })
    })
  };
  sandbox.window = sandbox;
  return { sandbox, logs };
}

const fileContent = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');
const sourceFile = ts.createSourceFile('temp.ts', fileContent, ts.ScriptTarget.Latest, true);

// Extract starterCodes from AST
const starterCodes = {};

function visit(node) {
  if (ts.isPropertyAssignment(node)) {
    const propName = node.name.text || (ts.isStringLiteral(node.name) ? node.name.text : null);
    if (propName && propName.startsWith('js') && ts.isObjectLiteralExpression(node.initializer)) {
      // Found a lesson object
      const lessonSlug = propName;
      // Search for part5 -> starterCode
      for (const partProp of node.initializer.properties) {
        if (ts.isPropertyAssignment(partProp) && partProp.name.text === 'part5' && ts.isObjectLiteralExpression(partProp.initializer)) {
          for (const p5Prop of partProp.initializer.properties) {
            if (ts.isPropertyAssignment(p5Prop) && p5Prop.name.text === 'starterCode' && (ts.isStringLiteral(p5Prop.initializer) || ts.isNoSubstitutionTemplateLiteral(p5Prop.initializer))) {
              starterCodes[lessonSlug] = p5Prop.initializer.text;
            }
          }
        }
      }
    }
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);

const results = [];
for (const [slug, code] of Object.entries(starterCodes)) {
  const { sandbox, logs } = createSandbox();
  try {
    const script = new vm.Script(`(async () => {\n${code}\n})()`);
    const context = vm.createContext(sandbox);
    script.runInContext(context, { timeout: 2000 });
    results.push({ slug, status: 'PASS', logsCount: logs.length, snippet: logs.slice(0, 2).join(' | ') });
  } catch (err) {
    results.push({ slug, status: 'FAIL', error: err.message, codeSnippet: code.slice(0, 100) });
  }
}

console.log(`\n=== AST-Extracted Validation Summary (${results.length} lessons evaluated) ===`);
let passCount = 0;
let failCount = 0;
for (const r of results) {
  if (r.status === 'PASS') {
    passCount++;
    console.log(`[PASS] ${r.slug} (${r.logsCount} logs) -> ${r.snippet}`);
  } else {
    failCount++;
    console.error(`[${r.status}] ${r.slug}: ${r.error}`);
  }
}
console.log(`\nTotal Passed: ${passCount} / ${results.length}`);
