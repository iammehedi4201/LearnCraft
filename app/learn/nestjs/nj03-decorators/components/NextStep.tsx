"use client";

import Link from "next/link";

export function NextStep() {
  return (
    <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
      <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
      <p className="text-emerald-900 dark:text-emerald-300">
        You now understand how decorators work under the hood. Move to <Link href="/learn/nestjs/nj04-solid" className="font-bold underline hover:text-emerald-600">NJ-04 — SOLID Principles</Link> to learn the architectural principles that make NestJS code scalable and maintainable.
      </p>
    </section>
  );
}
