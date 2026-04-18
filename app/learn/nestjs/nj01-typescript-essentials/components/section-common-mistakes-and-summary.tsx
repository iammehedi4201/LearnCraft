import Link from "next/link";

export function SectionCommonMistakesAndSummary() {
  return (
    <>
      <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
        <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">
          ⚠️ Common Mistakes
        </h3>
        <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
          <li>Using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">any</code> everywhere — it completely disables type checking. Use <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">unknown</code> + type guards instead.</li>
          <li>Not using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">strict: true</code> in tsconfig — NestJS projects should always have strict mode on.</li>
          <li>Confusing interfaces and types — use interfaces for object shapes (NestJS convention), types for unions and primitives.</li>
          <li>Forgetting <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">readonly</code> on properties that shouldn&apos;t change after creation.</li>
          <li>Re-writing the same interface for Create, Update, and Read — use <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">Omit</code> and <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">Partial</code> to derive them instead.</li>
        </ul>
      </section>

      <section className="mt-6 p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white flex items-center gap-2">
          🧠 What You Learned
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded shrink-0">1</span>
            <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Basic Types</strong> — <code className="text-blue-600">string</code>, <code className="text-blue-600">number</code>, <code className="text-blue-600">boolean</code> label your data so TypeScript can protect it</p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded shrink-0">2</span>
            <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Interfaces</strong> — Blueprints that enforce the shape of objects (NestJS uses these everywhere)</p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded shrink-0">3</span>
            <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Utility Types</strong> — <code className="text-blue-600">Omit</code>, <code className="text-blue-600">Partial</code>, <code className="text-blue-600">Pick</code> let you derive new types from existing ones</p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded shrink-0">4</span>
            <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Generics</strong> — Fill-in-the-blank types that make your code reusable without losing safety</p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded shrink-0">5</span>
            <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Type Narrowing</strong> — <code className="text-blue-600">typeof</code>, <code className="text-blue-600">instanceof</code>, and <code className="text-blue-600">in</code> let you check what a value really is</p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold px-2 py-1 rounded shrink-0">!</span>
            <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white"><code className="text-red-500">any</code> is dangerous</strong> — use <code className="text-blue-600">unknown</code> + type guards instead for safe code</p>
          </div>
        </div>
      </section>

      <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
        <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">
          📝 Next Step
        </h3>
        <p className="text-emerald-900 dark:text-emerald-300">
          Now that you understand TypeScript basics, move to <Link href="/learn/nestjs/nj02-oop-foundations" className="font-bold underline hover:text-emerald-600">NJ-02 — OOP Foundations</Link> to learn Classes, Inheritance, and the OOP patterns NestJS is built on.
        </p>
      </section>
    </>
  );
}
