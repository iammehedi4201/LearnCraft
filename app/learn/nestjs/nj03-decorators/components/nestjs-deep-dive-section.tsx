"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  StepList,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 15 — NESTJS DECORATORS DEEP DIVE
// ═══════════════════════════════════════════════════════════

export function NestjsDeepDiveSection() {
  return (
    <SectionContainer number={15} title="NestJS Decorators Deep Dive">
      {/* ── 15.1 Core NestJS Decorators Demystified ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Demystifying Every NestJS Decorator"
          description="NestJS code is not magic. Every single decorator is simply a factory that calls Reflect.defineMetadata() to attach configuration for the NestJS core engine."
          color="primary"
        />

        <div className="space-y-4 mb-8">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-ds-feature-lighter text-ds-feature-dark">@Controller(prefix)</span>
              <span className="text-xs font-bold text-ds-text-strong">Class Decorator</span>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Marks a class as an HTTP request handler. Stores the route path prefix (e.g. <code>/users</code>) on the class constructor.
            </p>
            <code className="text-xs font-mono bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block text-ds-feature-dark">
              Reflect.defineMetadata(&apos;path&apos;, prefix, target);
            </code>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-ds-info-lighter text-ds-info-dark">@Get(path) / @Post(path)</span>
              <span className="text-xs font-bold text-ds-text-strong">Method Decorator</span>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Maps a method to an HTTP verb and subpath. Stores the HTTP method (<code>GET</code>, <code>POST</code>) and URL path on the prototype method.
            </p>
            <code className="text-xs font-mono bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block text-ds-info-dark">
              Reflect.defineMetadata(&apos;method&apos;, RequestMethod.GET, target, key);
            </code>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-ds-success-lighter text-ds-success-dark">@Body() / @Param()</span>
              <span className="text-xs font-bold text-ds-text-strong">Parameter Decorator</span>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Records which argument index should receive the parsed request body or URL route parameter.
            </p>
            <code className="text-xs font-mono bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block text-ds-success-dark">
              Reflect.defineMetadata(&apos;routeParamtypes&apos;, &#123; [index]: RouteParamtypes.BODY &#125;, target, key);
            </code>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-ds-warning-lighter text-ds-warning-dark">@Injectable()</span>
              <span className="text-xs font-bold text-ds-text-strong">Class Decorator</span>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Marks a service class as a provider that can be injected into other constructors by the NestJS IoC container.
            </p>
            <code className="text-xs font-mono bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block text-ds-warning-dark">
              Reflect.defineMetadata(&apos;__injectable__&apos;, true, target);
            </code>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 15.2 The Complete NestJS Bootstrap Sequence ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The Complete NestJS Bootstrap Lifecycle"
          description="When you call NestFactory.create(AppModule), this 6-step lifecycle uses your decorators to assemble the running web server."
          color="sky"
        />

        <StepList
          steps={[
            {
              label: "1. Scan AppModule Metadata",
              note: "NestJS reads @Module({ controllers: [...], providers: [...] }) to discover all classes in the graph.",
            },
            {
              label: "2. Resolve Dependency Trees",
              note: "For each @Injectable(), NestJS reads 'design:paramtypes' to know what dependencies must be instantiated first.",
            },
            {
              label: "3. Instantiate Providers (Singletons)",
              note: "NestJS creates new instances of services in topological order and caches them in the IoC container.",
            },
            {
              label: "4. Instantiate Controllers",
              note: "Controllers are created and their constructor dependencies are automatically injected.",
            },
            {
              label: "5. Route Registration in Express/Fastify",
              note: "NestJS iterates over all methods with @Get()/@Post(), joins with @Controller(prefix), and registers express.get(fullPath, handler).",
            },
            {
              label: "6. Server Starts Listening",
              note: "The HTTP server begins receiving requests, running ValidationPipes and Guards before passing data to your methods.",
            },
          ]}
        />

        <QuickCheck
          question="Why is @Injectable() required on a NestJS service even if it doesn't accept any arguments in its constructor?"
          answer="@Injectable() triggers the TypeScript compiler to emit the 'design:paramtypes' metadata for that class. Without any decorator on the class, TypeScript would not emit metadata, and NestJS wouldn't be able to inspect or manage the class in its dependency injection container."
        />
      </div>
    </SectionContainer>
  );
}
