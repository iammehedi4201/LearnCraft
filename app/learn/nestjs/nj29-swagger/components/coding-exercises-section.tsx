"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON SWAGGER)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: OpenAPI Schemas &amp; Tagging">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your OpenAPI schema generation logic to the test! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: OpenAPI Schema Builder ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: DTO to OpenAPI Schema Converter</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "swagger-ex-01",
              title: "1. Build OpenAPI Schema Object",
              instructions: `Implement 'buildOpenApiSchema(dtoProps: Record<string, { type: string, required?: boolean, example?: any }>)':
Returns a standard OpenAPI 3.0 component schema object:
{
  type: 'object',
  properties: { [key]: { type, example } },
  required: [array of keys where required is true]
}`,
              starterCode: `function buildOpenApiSchema(dtoProps: Record<string, { type: string, required?: boolean, example?: any }>) {
  // Your code here:
}

const dto = {
  email: { type: 'string', required: true, example: 'a@b.com' },
  age: { type: 'number', required: false, example: 25 }
};
console.log("Schema:", JSON.stringify(buildOpenApiSchema(dto), null, 2));`,
              solutionCode: `function buildOpenApiSchema(dtoProps: Record<string, { type: string, required?: boolean, example?: any }>) {
  const properties: Record<string, any> = {};
  const required: string[] = [];

  for (const [key, val] of Object.entries(dtoProps)) {
    properties[key] = {
      type: val.type,
      ...(val.example !== undefined ? { example: val.example } : {})
    };
    if (val.required) {
      required.push(key);
    }
  }

  return {
    type: 'object',
    properties,
    ...(required.length > 0 ? { required } : {})
  };
}

const dto = {
  email: { type: 'string', required: true, example: 'a@b.com' },
  age: { type: 'number', required: false, example: 25 }
};
console.log("Schema:", JSON.stringify(buildOpenApiSchema(dto), null, 2));`,
              hints: [
                "Construct properties object and push required field names to required array.",
              ],
              tests: [
                {
                  name: "Constructs valid OpenAPI JSON Schema",
                  code: `const r = buildOpenApiSchema({ name: { type: "string", required: true, example: "Bob" } }); if (r.type !== "object" || r.properties.name.type !== "string" || !r.required.includes("name")) throw new Error("Schema build failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Route Tag Grouping ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Route Tag Grouping Engine</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "swagger-ex-02",
              title: "2. Build Route Tag Grouping Engine",
              instructions: `Implement 'groupRoutesByTag(endpoints: Array<{ path: string, method: string, tag: string }>)':
Groups endpoints into an object keyed by tag name:
{
  [tag]: Array<{ path: string, method: string }>
}`,
              starterCode: `function groupRoutesByTag(endpoints: Array<{ path: string, method: string, tag: string }>) {
  // Your code here:
}

const api = [
  { path: '/auth/login', method: 'POST', tag: 'Auth' },
  { path: '/auth/register', method: 'POST', tag: 'Auth' },
  { path: '/users', method: 'GET', tag: 'Users' }
];
console.log("Grouped:", groupRoutesByTag(api));`,
              solutionCode: `function groupRoutesByTag(endpoints: Array<{ path: string, method: string, tag: string }>) {
  const result: Record<string, Array<{ path: string, method: string }>> = {};

  for (const ep of endpoints) {
    if (!result[ep.tag]) {
      result[ep.tag] = [];
    }
    result[ep.tag].push({ path: ep.path, method: ep.method });
  }

  return result;
}

const api = [
  { path: '/auth/login', method: 'POST', tag: 'Auth' },
  { path: '/auth/register', method: 'POST', tag: 'Auth' },
  { path: '/users', method: 'GET', tag: 'Users' }
];
console.log("Grouped:", groupRoutesByTag(api));`,
              hints: [
                "Iterate endpoints and initialize result[tag] array if it does not exist.",
              ],
              tests: [
                {
                  name: "Groups endpoints by tag accurately",
                  code: `const r = groupRoutesByTag([{ path: "/a", method: "GET", tag: "T1" }, { path: "/b", method: "POST", tag: "T1" }]); if (r.T1.length !== 2) throw new Error("Tag grouping failed");`,
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
