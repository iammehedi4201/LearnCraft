import { describe, it, expect } from "vitest";
import { getAllLessons } from "../../app/learn/javascript/data/javascript-curriculum";
import { getJSLessonContent } from "../../app/learn/javascript/data/javascript-lesson-content";
import * as vm from "vm";

function createPlaygroundSandbox() {
  const logs: string[] = [];
  const sandbox = {
    console: {
      log: (...args: any[]) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" ")),
      warn: (...args: any[]) => logs.push("[WARN] " + args.join(" ")),
      error: (...args: any[]) => logs.push("[ERROR] " + args.join(" ")),
      info: (...args: any[]) => logs.push("[INFO] " + args.join(" ")),
      table: (...args: any[]) => logs.push("[TABLE] " + JSON.stringify(args[0])),
    },
    setTimeout: (fn: Function, _ms: number) => { try { fn(); } catch (_) {} return 1; },
    clearTimeout: () => {},
    setInterval: (fn: Function, _ms: number) => { try { fn(); } catch (_) {} return 1; },
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
    structuredClone: (obj: any) => JSON.parse(JSON.stringify(obj)),
    window: {} as any,
    document: {
      querySelector: (_sel: string) => ({
        textContent: "Task 1",
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        addEventListener: () => {}
      }),
      querySelectorAll: (_sel: string) => [
        { textContent: "Item 1", classList: { add: () => {} } }
      ],
      createElement: (_tag: string) => ({
        textContent: "",
        appendChild: () => {},
        classList: { add: () => {} }
      })
    },
    localStorage: {
      _data: {} as Record<string, string>,
      getItem(k: string) { return this._data[k] || null; },
      setItem(k: string, v: any) { this._data[k] = String(v); },
      removeItem(k: string) { delete this._data[k]; },
      clear() { this._data = {}; }
    },
    fetch: async (_url: string, _options?: any) => ({
      ok: true,
      status: 200,
      json: async () => ({ id: 1, title: "Sample Resource", completed: false })
    })
  };
  sandbox.window = sandbox;
  return { sandbox, logs };
}

describe("JavaScript Playground Code Examples Validation Suite", () => {
  const authoritativeLessons = getAllLessons();

  it("ensures all 22 lessons have non-empty executable starterCode in Part 5", () => {
    expect(authoritativeLessons.length).toBe(22);

    for (const meta of authoritativeLessons) {
      const lesson = getJSLessonContent(meta.slug);
      expect(lesson.part5, `Missing part5 for ${meta.slug}`).toBeDefined();
      expect(lesson.part5?.starterCode, `Missing starterCode for ${meta.slug}`).toBeDefined();
      expect(lesson.part5?.starterCode?.length, `Empty starterCode for ${meta.slug}`).toBeGreaterThan(30);
    }
  });

  for (const meta of authoritativeLessons) {
    it(`executes ${meta.code} (${meta.slug}) starterCode in playground runtime without unhandled syntax or runtime errors`, async () => {
      const lesson = getJSLessonContent(meta.slug);
      const code = lesson.part5?.starterCode || "";
      const { sandbox, logs } = createPlaygroundSandbox();

      const context = vm.createContext(sandbox);

      // Execute in sandbox with timeout protection
      expect(() => {
        const script = new vm.Script(code);
        script.runInContext(context, { timeout: 1000 });
      }, `Runtime execution failure in ${meta.code} (${meta.slug})`).not.toThrow();

      // Allow async functions / microtasks to settle
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Ensure that the script actually executed statements and produced console logs
      expect(logs.length, `Expected console logs in ${meta.code} (${meta.slug})`).toBeGreaterThan(0);
    });
  }
});
