// ═══════════════════════════════════════════════════════════
// Learning Craft — Runtime Registry (Factory)
// ═══════════════════════════════════════════════════════════
//
// Returns the correct runtime implementation for a given type.
// V1: Only TypeScript and JavaScript are supported.
// Future runtimes can be registered here without changing the UI.

import type { PlaygroundRuntime, PlaygroundRuntimeType } from "../types";
import { TypeScriptRuntime } from "./typescript-runtime";

const COMING_SOON_RUNTIMES: Partial<Record<PlaygroundRuntimeType, string>> = {
  html: "HTML",
  "html-css": "HTML + CSS",
  react: "React",
  nextjs: "Next.js",
  nestjs: "NestJS",
  node: "Node.js",
  postgresql: "PostgreSQL",
  sql: "SQL",
  prisma: "Prisma",
};

/** Create a runtime instance for the given type */
export function createRuntime(type: PlaygroundRuntimeType): PlaygroundRuntime {
  switch (type) {
    case "typescript":
    case "javascript":
      return new TypeScriptRuntime();

    default: {
      const label = COMING_SOON_RUNTIMES[type] || type;
      throw new Error(
        `Runtime "${label}" is coming soon! Currently only TypeScript and JavaScript are supported.`
      );
    }
  }
}

/** Get display label for a runtime type */
export function getRuntimeLabel(type: PlaygroundRuntimeType): string {
  const labels: Record<PlaygroundRuntimeType, string> = {
    typescript: "TypeScript",
    javascript: "JavaScript",
    html: "HTML",
    "html-css": "HTML + CSS",
    react: "React",
    nextjs: "Next.js",
    nestjs: "NestJS",
    node: "Node.js",
    postgresql: "PostgreSQL",
    sql: "SQL",
    prisma: "Prisma",
  };
  return labels[type] || type;
}
