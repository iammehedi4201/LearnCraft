"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  Divider,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 13 — METADATA & REFLECTION
// ═══════════════════════════════════════════════════════════

export function MetadataReflectionSection() {
  return (
    <SectionContainer number={13} title="Metadata & Reflection">
      {/* ── 13.1 What is Metadata? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is Metadata & Why Does NestJS Need It?"
          description="Metadata is 'data about data'. It allows you to attach invisible notes and configuration to classes, methods, and properties that NestJS reads at startup."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The Core reflect-metadata API:
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            In TypeScript, metadata is stored using the <code>reflect-metadata</code> polyfill library:
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-ds-bg-white border border-ds-stroke-soft text-ds-feature-dark">
              <strong>Reflect.defineMetadata(key, value, target, propertyKey?)</strong> — Stores metadata
            </div>
            <div className="p-2.5 rounded-lg bg-ds-bg-white border border-ds-stroke-soft text-ds-info-dark">
              <strong>Reflect.getMetadata(key, target, propertyKey?)</strong> — Retrieves metadata
            </div>
          </div>
        </WhyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Storing & Reading Metadata</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated reflect-metadata store for playground environment:
const _metadataStore = new Map<string, any>();

const MockReflect = {
  defineMetadata(key: string, value: any, target: any, prop?: string) {
    const storeKey = (prop ? target.constructor.name + "." + prop : target.name) + "::" + key;
    _metadataStore.set(storeKey, value);
  },
  getMetadata(key: string, target: any, prop?: string) {
    const storeKey = (prop ? target.constructor.name + "." + prop : target.name) + "::" + key;
    return _metadataStore.get(storeKey);
  }
};

// Step 1: Create a decorator that attaches route metadata
function Controller(routePrefix: string) {
  return function (target: Function) {
    MockReflect.defineMetadata("path", routePrefix, target);
  };
}

function Get(path: string = "") {
  return function (target: any, propertyKey: string) {
    MockReflect.defineMetadata("method", "GET", target, propertyKey);
    MockReflect.defineMetadata("path", path, target, propertyKey);
  };
}

// Step 2: Decorate a class
@Controller("/api/users")
class UsersController {
  @Get("/active")
  getActiveUsers() {
    return [{ id: 1, name: "Mehedi" }];
  }
}

// Step 3: Framework inspection at startup (What NestJS does!)
const prefix = MockReflect.getMetadata("path", UsersController);
const method = MockReflect.getMetadata("method", UsersController.prototype, "getActiveUsers");
const subPath = MockReflect.getMetadata("path", UsersController.prototype, "getActiveUsers");

console.log("Registered Route:", method + " " + prefix + subPath);`}
            height="460px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 13.2 Dependency Injection via Type Metadata ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Automatic Type Metadata & Dependency Injection"
          description="When 'emitDecoratorMetadata: true' is enabled, TypeScript automatically emits parameter types. This is how NestJS knows what services to inject into constructors!"
          color="sky"
        />

        <InfoCallout emoji="🪄" title="How NestJS Dependency Injection Works Under the Hood">
          <div className="text-xs text-ds-text-strong space-y-2">
            <p>1. You write: <code>constructor(private usersService: UsersService) &#123;&#125;</code></p>
            <p>2. TypeScript automatically emits: <code>design:paramtypes = [UsersService]</code></p>
            <p>3. At startup, NestJS reads <code>Reflect.getMetadata(&apos;design:paramtypes&apos;, UsersController)</code></p>
            <p>4. NestJS instantiates <code>new UsersService()</code> and passes it into the controller constructor automatically!</p>
          </div>
        </InfoCallout>

        <QuickCheck
          question="What tsconfig compiler flag tells TypeScript to emit parameter types as metadata for Dependency Injection?"
          answer="'emitDecoratorMetadata: true' tells TypeScript to automatically record 'design:paramtypes', 'design:type', and 'design:returntype' using Reflect.defineMetadata. NestJS reads 'design:paramtypes' to resolve constructor dependencies."
        />
      </div>
    </SectionContainer>
  );
}
