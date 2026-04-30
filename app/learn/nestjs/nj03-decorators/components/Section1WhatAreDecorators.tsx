"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { InfoBox } from "./InfoBox";
import { SectionWrapper } from "./SectionWrapper";
import { QuickCheck } from "./QuickCheck";

export function Section1WhatAreDecorators() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. What Are Decorators?</h2>
      <SectionWrapper>
        {/* What is this? */}
        <InfoBox variant="info" title="What is a Decorator?">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A decorator is just a <strong>function that adds extra information or behavior</strong> to something — a class, a method, a property, or a function parameter. You apply it using the <code className="text-sky-600">@</code> symbol. The decorator runs <em>automatically</em> when the class is loaded — you don&apos;t call it yourself.
          </p>
        </InfoBox>

        {/* Sticker Analogy */}
        <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8 mt-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">The &quot;Sticker&quot; Metaphor: Labels on a Package</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Imagine you&apos;re shipping a package. You put stickers on it: <strong>&quot;Fragile&quot;</strong>, <strong>&quot;This Side Up&quot;</strong>, <strong>&quot;Handle With Care&quot;</strong>. The stickers don&apos;t change what&apos;s inside the box — they tell the <em>delivery system</em> how to handle it. <strong>Decorators work exactly the same way.</strong> When you write <code className="text-amber-600">@Controller(&apos;users&apos;)</code>, you&apos;re putting a sticker on a class that tells NestJS: &quot;This is a controller. Route all /users requests to it.&quot;
            </p>
          </div>
        </div>

        {/* The 4 types */}
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">The 4 Types of Decorators</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-100 dark:border-purple-900/30">
            <h5 className="text-xs font-bold text-purple-600 uppercase mb-1">1. Class Decorators</h5>
            <p className="text-[11px] text-slate-500">Sticker on the <strong>whole class</strong>. NestJS: <code className="text-purple-600">@Controller</code>, <code className="text-purple-600">@Module</code>, <code className="text-purple-600">@Injectable</code></p>
          </div>
          <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <h5 className="text-xs font-bold text-blue-600 uppercase mb-1">2. Method Decorators</h5>
            <p className="text-[11px] text-slate-500">Sticker on a <strong>specific method</strong>. NestJS: <code className="text-blue-600">@Get</code>, <code className="text-blue-600">@Post</code>, <code className="text-blue-600">@UseGuards</code></p>
          </div>
          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <h5 className="text-xs font-bold text-emerald-600 uppercase mb-1">3. Property Decorators</h5>
            <p className="text-[11px] text-slate-500">Sticker on a <strong>class property</strong>. TypeORM: <code className="text-emerald-600">@Column</code>. Validation: <code className="text-emerald-600">@IsEmail</code></p>
          </div>
          <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-100 dark:border-rose-900/30">
            <h5 className="text-xs font-bold text-rose-600 uppercase mb-1">4. Parameter Decorators</h5>
            <p className="text-[11px] text-slate-500">Sticker on a <strong>function parameter</strong>. NestJS: <code className="text-rose-600">@Body</code>, <code className="text-rose-600">@Param</code>, <code className="text-rose-600">@Query</code></p>
          </div>
        </div>

        {/* tsconfig requirement */}
        <InfoBox variant="danger" title="⚙️ Required Setup — tsconfig.json">
          <EnhancedCodeBlock
            code={`// You MUST enable these two flags for decorators to work:
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true   // NestJS needs this for DI
  }
}
// NestJS projects have this enabled by default.`}
            language="json"
          />
        </InfoBox>

        {/* Decorator vs Decorator Factory */}
        <InfoBox variant="warning" title="Key Concept: Decorator vs Decorator Factory" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <p className="font-bold text-slate-900 dark:text-white mb-1">Plain Decorator</p>
              <p className="mb-2">No parentheses. Runs directly.</p>
              <EnhancedCodeBlock code={`@Logger\nclass MyService {}`} language="typescript" />
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <p className="font-bold text-slate-900 dark:text-white mb-1">Decorator Factory</p>
              <p className="mb-2">Has parentheses. Returns a decorator. Takes options.</p>
              <EnhancedCodeBlock code={`@Controller('users')\nclass UsersController {}`} language="typescript" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">NestJS uses <strong>Decorator Factories</strong> almost everywhere because they need to accept configuration (like the route path).</p>
        </InfoBox>

        <QuickCheck
          question={`What's the difference between "@Logger" and "@Controller('users')"?`}
          answer={`@Logger is a plain decorator — it's a function that runs directly on the class. @Controller('users') is a Decorator Factory — it's a function that takes an argument ('users') and RETURNS a decorator function. The factory pattern lets you pass configuration to the decorator. NestJS uses factories because it needs the route prefix, module config, etc.`}
        />
      </SectionWrapper>
    </section>
  );
}
