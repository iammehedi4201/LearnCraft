"use client";

export function CommonMistakes() {
  return (
    <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
      <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
      <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
        <li>Forgetting to enable <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">experimentalDecorators</code> and <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">emitDecoratorMetadata</code> in tsconfig.</li>
        <li>Applying decorators in the wrong order — they execute <strong>bottom-to-top</strong> for methods, <strong>left-to-right</strong> for parameters.</li>
        <li>Trying to use decorators in plain .js files — they require TypeScript.</li>
        <li>Confusing decorator factories (functions that <em>return</em> decorators, with parentheses) with plain decorators (without parentheses).</li>
        <li>Writing <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">@Injectable</code> without parentheses — NestJS factories <strong>always need ()</strong>, even with no arguments.</li>
      </ul>
    </section>
  );
}
