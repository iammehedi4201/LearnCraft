"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON FILTERS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Exception Formatting">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your exception formatting skills into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Format Error Response ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Standard Error Formatter</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "filters-ex-01",
              title: "1. Build Error Response Formatter",
              instructions: `Implement 'formatError(err: any, url: string)':
1. If err has status (e.g. err.status), use it; otherwise default to 500.
2. If err.message is present, use it; otherwise default to "Internal server error".
3. Return object: { statusCode: status, message: msg, path: url, timestamp: "2026-08-18" }.`,
              starterCode: `function formatError(err: any, url: string) {
  // Your code here:
}

console.log("404 Error:", formatError({ status: 404, message: "User not found" }, "/users/10"));
console.log("500 Error:", formatError(new Error("DB crashed"), "/posts"));`,
              solutionCode: `function formatError(err: any, url: string) {
  const statusCode = err && typeof err.status === "number" ? err.status : 500;
  const message = err && err.message ? err.message : "Internal server error";

  return {
    statusCode,
    message,
    path: url,
    timestamp: "2026-08-18",
  };
}

console.log("404 Error:", formatError({ status: 404, message: "User not found" }, "/users/10"));
console.log("500 Error:", formatError(new Error("DB crashed"), "/posts"));`,
              hints: [
                "Check typeof err.status === 'number' for status code.",
                "Default to 500 if no status exists.",
              ],
              tests: [
                {
                  name: "Formats 404 exception correctly",
                  code: `const r = formatError({ status: 404, message: "Not Found" }, "/test"); if (!r || r.statusCode !== 404 || r.path !== "/test" || r.message !== "Not Found") throw new Error("404 format failed");`,
                },
                {
                  name: "Defaults raw Error to 500",
                  code: `const r = formatError(new Error("Unexpected"), "/api"); if (!r || r.statusCode !== 500 || r.message !== "Unexpected") throw new Error("500 fallback failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Prisma/DB Error Mapper ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Database Error Code Mapper</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "filters-ex-02",
              title: "2. Build Database Error Code Mapper",
              instructions: `Implement 'mapDbError(err: { code?: string, message?: string })':
1. If err.code === "P2002" (Unique constraint violation), return { statusCode: 409, error: "Conflict", message: "Duplicate record already exists" }.
2. If err.code === "P2025" (Record not found), return { statusCode: 404, error: "Not Found", message: "Record to update was not found" }.
3. Otherwise, return { statusCode: 500, error: "Internal Server Error", message: "Database operation failed" }.`,
              starterCode: `function mapDbError(err: { code?: string, message?: string }) {
  // Your code here:
}

console.log("Duplicate error:", mapDbError({ code: "P2002" }));
console.log("Missing error:  ", mapDbError({ code: "P2025" }));
console.log("Unknown error:  ", mapDbError({ code: "P9999" }));`,
              solutionCode: `function mapDbError(err: { code?: string, message?: string }) {
  if (err.code === "P2002") {
    return { statusCode: 409, error: "Conflict", message: "Duplicate record already exists" };
  }
  if (err.code === "P2025") {
    return { statusCode: 404, error: "Not Found", message: "Record to update was not found" };
  }
  return { statusCode: 500, error: "Internal Server Error", message: "Database operation failed" };
}

console.log("Duplicate error:", mapDbError({ code: "P2002" }));
console.log("Missing error:  ", mapDbError({ code: "P2025" }));
console.log("Unknown error:  ", mapDbError({ code: "P9999" }));`,
              hints: [
                "Match err.code against 'P2002' (409) and 'P2025' (404).",
              ],
              tests: [
                {
                  name: "Maps P2002 to 409 Conflict",
                  code: `const r = mapDbError({ code: "P2002" }); if (!r || r.statusCode !== 409 || r.error !== "Conflict") throw new Error("P2002 mapping failed");`,
                },
                {
                  name: "Maps P2025 to 404 Not Found",
                  code: `const r = mapDbError({ code: "P2025" }); if (!r || r.statusCode !== 404 || r.error !== "Not Found") throw new Error("P2025 mapping failed");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
