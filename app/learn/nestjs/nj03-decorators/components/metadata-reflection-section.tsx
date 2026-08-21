"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
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
          title="What is Metadata & How Does NestJS Use It?"
          description="Metadata simply means 'data about data'. It lets you attach invisible notes and configuration tags to classes and methods that NestJS reads when the server starts up."
          color="primary"
        />

        <AnalogyBox emoji="🏷️" title="The Nutrition Label Analogy">
          <p>
            Think of <strong>Metadata</strong> like a nutrition label or barcode on a cereal box.
          </p>
          <p className="mt-2">
            The label is not the cereal itself, but it gives store scanners and shoppers important information (calories, ingredients, price).
          </p>
          <p className="mt-2">
            In NestJS, metadata notes tell the framework: <em>&quot;This method responds to HTTP GET on /users&quot;</em> or <em>&quot;This controller needs a database service injected into its constructor.&quot;</em>
          </p>
        </AnalogyBox>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The 2 Core reflect-metadata Functions:
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            In TypeScript, metadata is saved and loaded using the <code>reflect-metadata</code> library:
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-ds-bg-white border border-ds-stroke-soft text-ds-feature-dark">
              <strong>Reflect.defineMetadata(key, value, target, propertyKey?)</strong> — Sticks a metadata tag onto the class or method
            </div>
            <div className="p-2.5 rounded-lg bg-ds-bg-white border border-ds-stroke-soft text-ds-info-dark">
              <strong>Reflect.getMetadata(key, target, propertyKey?)</strong> — Reads back that metadata tag later
            </div>
          </div>
        </WhyBox>

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Try It Yourself: Storing & Reading Metadata</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            See how route decorators store metadata tags that the framework inspects during startup:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated metadata storage for our playground:
const _metadataStore = new Map<string, any>();

const SimpleReflect = {
  defineMetadata(key: string, value: any, target: any, prop?: string) {
    const storeKey = (prop ? target.constructor.name + "." + prop : target.name) + "::" + key;
    _metadataStore.set(storeKey, value);
  },
  getMetadata(key: string, target: any, prop?: string) {
    const storeKey = (prop ? target.constructor.name + "." + prop : target.name) + "::" + key;
    return _metadataStore.get(storeKey);
  }
};

// 1. Decorators that attach metadata notes:
function Controller(pathPrefix: string) {
  return function (target: Function) {
    SimpleReflect.defineMetadata("path", pathPrefix, target);
  };
}

function Get(subPath: string = "") {
  return function (target: any, propertyKey: string) {
    SimpleReflect.defineMetadata("httpMethod", "GET", target, propertyKey);
    SimpleReflect.defineMetadata("subPath", subPath, target, propertyKey);
  };
}

// 2. Decorate our controller class:
@Controller("/api/users")
class UsersController {
  @Get("/active")
  getActiveUsers() {
    return [{ id: 1, name: "Mehedi" }];
  }
}

// 3. What NestJS does at server startup:
const prefix = SimpleReflect.getMetadata("path", UsersController);
const method = SimpleReflect.getMetadata("httpMethod", UsersController.prototype, "getActiveUsers");
const subPath = SimpleReflect.getMetadata("subPath", UsersController.prototype, "getActiveUsers");

console.log("🚀 NestJS registered route: " + method + " " + prefix + subPath);`}
            height="460px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 13.2 Dependency Injection via Type Metadata ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Automatic Dependency Injection with Type Metadata"
          description="When 'emitDecoratorMetadata: true' is enabled in tsconfig.json, TypeScript automatically attaches parameter types to your classes."
          color="sky"
        />

        <InfoCallout emoji="🪄" title="How NestJS Dependency Injection Works in 4 Steps">
          <div className="text-xs text-ds-text-strong space-y-2">
            <p>1. You write: <code>constructor(private usersService: UsersService) &#123;&#125;</code></p>
            <p>2. TypeScript automatically emits: <code>design:paramtypes = [UsersService]</code></p>
            <p>3. At startup, NestJS reads <code>Reflect.getMetadata(&apos;design:paramtypes&apos;, UsersController)</code></p>
            <p>4. NestJS automatically creates <code>new UsersService()</code> and passes it into the controller!</p>
          </div>
        </InfoCallout>

        <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft mt-6 mb-8">
          <h5 className="font-bold text-xs uppercase tracking-wider text-ds-text-strong mb-2">The 3 Built-in TypeScript Metadata Keys:</h5>
          <ul className="text-xs text-ds-text-sub space-y-2">
            <li>• <code className="font-bold text-ds-feature-dark">design:paramtypes</code> — Types of parameters accepted by constructor or method (used for Dependency Injection!).</li>
            <li>• <code className="font-bold text-ds-info-dark">design:type</code> — Type of a property.</li>
            <li>• <code className="font-bold text-ds-success-dark">design:returntype</code> — Return type of a method.</li>
          </ul>
        </div>

        <QuickCheck
          question="What tsconfig compiler flag enables automatic parameter type recording for Dependency Injection?"
          answer="'emitDecoratorMetadata: true' tells TypeScript to automatically record 'design:paramtypes' whenever a decorator is present. NestJS reads 'design:paramtypes' to know which services need to be injected into constructors."
        />
      </div>
    </SectionContainer>
  );
}
