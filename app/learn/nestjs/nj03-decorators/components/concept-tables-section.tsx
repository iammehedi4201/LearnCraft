"use client";

import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 17 — CONCEPT TABLES & CHEATSHEET
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={9} title="Concept Tables & Cheatsheet">
      {/* ── 17.1 Decorator Types Cheatsheet ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Decorator Types & Signatures Cheatsheet"
          description="A quick reference guide to the 4 decorator types, their parameters, and what they receive from TypeScript."
          color="primary"
        />

        <ComparisonTable
          headers={["Type", "Target Parameter", "Property Key", "Descriptor", "Return Value"]}
          rows={[
            ["Class Decorator", "constructor: Function", "N/A", "N/A", "New constructor (subclass) or void"],
            ["Method Decorator", "Class.prototype (or constructor for static)", "string | symbol", "PropertyDescriptor", "New PropertyDescriptor or void"],
            ["Property Decorator", "Class.prototype (or constructor for static)", "string | symbol", "N/A", "void"],
            ["Parameter Decorator", "Class.prototype (or constructor for static)", "string | undefined", "N/A (receives paramIndex: number)", "void"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 17.2 NestJS Decorator Map ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="NestJS Decorators to TypeScript Mapping"
          description="How everyday NestJS decorators translate directly to the underlying TypeScript decorator types."
          color="sky"
        />

        <ComparisonTable
          headers={["NestJS Decorator", "Decorator Type", "What It Does Under the Hood"]}
          rows={[
            ["@Controller(prefix)", "Class Decorator", "Stamps the URL route prefix note onto the class constructor"],
            ["@Injectable()", "Class Decorator", "Marks class as injectable and tells TypeScript to record parameter type notes"],
            ["@Module(config)", "Class Decorator", "Saves the list of controllers and services needed to build this module"],
            ["@Get(path) / @Post(path)", "Method Decorator", "Stores HTTP action (GET, POST) and sub-path notes on the method"],
            ["@UseGuards(Guard)", "Method/Class Decorator", "Attaches security check guards to run before the method is called"],
            ["@Body() / @Param(name)", "Parameter Decorator", "Records the argument position so the router knows where to inject request data"],
            ["@Headers() / @Query()", "Parameter Decorator", "Records the argument position for headers or URL query string data"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 17.3 Key Terminology Definitions ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Key Vocabulary in Plain English"
          description="A friendly dictionary of important terms you will encounter in TypeScript and NestJS."
          color="emerald"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">Decorator</h5>
            <p className="text-xs text-ds-text-sub">A helper function prefixed with <code>@</code> that wraps or adds superpowers to classes, methods, or properties.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">Metadata</h5>
            <p className="text-xs text-ds-text-sub">Invisible notes or stickers attached to code (like route URLs, required roles, or types) that frameworks read at startup.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">Function Wrapper</h5>
            <p className="text-xs text-ds-text-sub">A function that takes an existing function, wraps extra tasks around it (like timers or security checks), and returns the new version.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">Closure</h5>
            <p className="text-xs text-ds-text-sub">An inner function that remembers settings from its outer function even after the outer function has finished running.</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
