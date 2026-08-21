"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  StepList,
  AnalogyBox,
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
          description="NestJS code is not magic. Every single decorator is simply a helper factory that attaches metadata tags so the NestJS server engine knows how to route requests."
          color="primary"
        />

        <AnalogyBox emoji="🧩" title="The Blueprint Stickers Analogy">
          <p>
            Think of writing NestJS code like drawing blueprints for a restaurant:
          </p>
          <p className="mt-2">
            <code>@Controller(&apos;orders&apos;)</code> labels the kitchen order counter, <code>@Get()</code> labels the pickup window, and <code>@Body()</code> tells the chef where to look for the customer&apos;s order slip!
          </p>
        </AnalogyBox>

        <div className="space-y-4 mb-8 mt-6">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-ds-feature-lighter text-ds-feature-dark">@Controller(prefix)</span>
              <span className="text-xs font-bold text-ds-text-strong">Class Decorator</span>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Tells NestJS: <em>&quot;This class handles HTTP web requests for the URL path prefix (e.g. <code>/users</code>)&quot;</em>.
            </p>
            <pre className="text-xs font-mono bg-ds-bg-white p-3 rounded-lg border border-ds-stroke-soft block text-ds-feature-dark overflow-x-auto">
{`Reflect.defineMetadata('path', prefix, target);`}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-ds-info-lighter text-ds-info-dark">@Get(path) / @Post(path)</span>
              <span className="text-xs font-bold text-ds-text-strong">Method Decorator</span>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Tells NestJS which HTTP action (<code>GET</code>, <code>POST</code>) and sub-route triggers this specific method.
            </p>
            <pre className="text-xs font-mono bg-ds-bg-white p-3 rounded-lg border border-ds-stroke-soft block text-ds-info-dark overflow-x-auto">
{`Reflect.defineMetadata('method', 'GET', target, key);
Reflect.defineMetadata('path', path, target, key);`}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-ds-success-lighter text-ds-success-dark">@Body() / @Param()</span>
              <span className="text-xs font-bold text-ds-text-strong">Parameter Decorator</span>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Records which argument position should receive the parsed request JSON body or URL route parameter.
            </p>
            <pre className="text-xs font-mono bg-ds-bg-white p-3 rounded-lg border border-ds-stroke-soft block text-ds-success-dark overflow-x-auto">
{`Reflect.defineMetadata('paramType', 'body', target, key);`}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-ds-warning-lighter text-ds-warning-dark">@Injectable()</span>
              <span className="text-xs font-bold text-ds-text-strong">Class Decorator</span>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
              Marks a service class so NestJS can automatically create it and pass it into other constructors (Dependency Injection).
            </p>
            <pre className="text-xs font-mono bg-ds-bg-white p-3 rounded-lg border border-ds-stroke-soft block text-ds-warning-dark overflow-x-auto">
{`Reflect.defineMetadata('injectable', true, target);`}
            </pre>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 15.2 The Complete NestJS Bootstrap Sequence ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The 6-Step Startup Sequence of NestJS"
          description="When you call NestFactory.create(AppModule), NestJS uses your decorator stickers to assemble the entire backend server."
          color="sky"
        />

        <StepList
          steps={[
            {
              label: "1. Scan AppModule Decorators",
              note: "NestJS reads @Module({ controllers: [...], providers: [...] }) to discover all the classes in your application.",
            },
            {
              label: "2. Check Service Dependencies",
              note: "For each @Injectable(), NestJS reads 'design:paramtypes' to know what other services must be created first.",
            },
            {
              label: "3. Create Service Instances (Singletons)",
              note: "NestJS creates shared instances of your services and stores them in its memory container.",
            },
            {
              label: "4. Create Controllers & Inject Services",
              note: "Controllers are created and their needed services are passed directly into their constructors.",
            },
            {
              label: "5. Register HTTP Routes",
              note: "NestJS joins @Controller('/users') with @Get('/all') and sets up the web server routes (e.g. GET /users/all).",
            },
            {
              label: "6. Server Starts Listening for Requests",
              note: "The server opens for traffic, running validation and security guards before sending incoming data to your methods!",
            },
          ]}
        />

        <QuickCheck
          question="Why is @Injectable() required on a NestJS service even if it doesn't accept any arguments in its constructor?"
          answer="@Injectable() tells the TypeScript compiler to emit the 'design:paramtypes' metadata for that class. Without any decorator on the class, TypeScript would not emit metadata notes, and NestJS wouldn't be able to manage the class in its Dependency Injection system."
        />
      </div>
    </SectionContainer>
  );
}
