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
    <SectionContainer number={17} title="Concept Tables & Cheatsheet">
      {/* ── 17.1 Decorator Types Cheatsheet ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Decorator Types & Signatures Cheatsheet"
          description="A quick reference guide to the 4 decorator types, their parameters, and return values."
          color="primary"
        />

        <ComparisonTable
          headers={["Type", "Target Parameter", "Property Key", "Descriptor", "Return Value"]}
          rows={[
            ["Class Decorator", "constructor: Function", "N/A", "N/A", "New constructor or void"],
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
          description="How high-level NestJS decorators translate directly to the underlying decorator types."
          color="sky"
        />

        <ComparisonTable
          headers={["NestJS Decorator", "Decorator Type", "What It Does Under the Hood"]}
          rows={[
            ["@Controller(prefix)", "Class Decorator", "Attaches route prefix metadata to class constructor"],
            ["@Injectable()", "Class Decorator", "Marks class as provider and triggers TypeScript type metadata emission"],
            ["@Module(config)", "Class Decorator", "Stores imports, controllers, providers, and exports metadata"],
            ["@Get(path) / @Post(path)", "Method Decorator", "Stores HTTP verb and subpath metadata on method"],
            ["@UseGuards(Guard)", "Method/Class Decorator", "Attaches CanActivate guard array to metadata"],
            ["@Body() / @Param(name)", "Parameter Decorator", "Records parameter index for request data injection"],
            ["@Headers() / @Query()", "Parameter Decorator", "Records parameter index for headers/query string extraction"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 17.3 Key Terminology Definitions ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Key Vocabulary & Definitions"
          description="Master the core technical terms used in TypeScript and NestJS metaprogramming."
          color="emerald"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">Metaprogramming</h5>
            <p className="text-xs text-ds-text-sub">Writing programs that inspect, modify, or generate other programs or code structures.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">Metadata</h5>
            <p className="text-xs text-ds-text-sub">Data attached to classes or methods describing their configuration, route paths, or types.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">Higher-Order Function</h5>
            <p className="text-xs text-ds-text-sub">A function that accepts one or more functions as arguments and/or returns a new function.</p>
          </div>
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">Closure</h5>
            <p className="text-xs text-ds-text-sub">A function bundled together with references to its surrounding lexical state (outer variables).</p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
