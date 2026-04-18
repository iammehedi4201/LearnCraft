/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-03 — Decorators Deep Dive
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * Decorators are special functions that attach metadata to classes, methods,
 * properties, or parameters. They use the @ syntax and are THE defining feature
 * of NestJS. Without understanding decorators, NestJS code looks like magic.
 *
 * WHY THIS MATTERS FOR NESTJS
 * ───────────────────────────
 * Every NestJS concept uses decorators:
 * @Module, @Controller, @Injectable, @Get, @Post, @Body, @Param, @UseGuards...
 * They tell NestJS HOW to wire your classes together.
 *
 * EXPRESS.JS COMPARISON
 * ─────────────────────
 * Express has no decorators. You wire everything manually with app.get(),
 * app.use(), etc. NestJS decorators are declarative — they describe WHAT
 * your code does, not HOW to wire it.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { useState } from "react";

// ─── Reusable Quick Check Component ─────────────────────────────────
function QuickCheck({
  question,
  code,
  answer,
}: {
  question: string;
  code?: string;
  answer: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-6 p-5 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🧠</span>
        <h5 className="font-bold text-sm text-indigo-700 dark:text-indigo-400">
          Quick Check
        </h5>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
        {question}
      </p>
      {code && (
        <pre className="bg-gray-900 text-slate-300 p-3 rounded-xl overflow-x-auto text-sm border border-slate-800 mb-3">
          {code}
        </pre>
      )}
      <button
        onClick={() => setShow(!show)}
        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
      >
        {show ? "Hide Answer ▲" : "Show Answer ▼"}
      </button>
      {show && (
        <div className="mt-3 p-3 bg-white dark:bg-slate-800/60 rounded-xl border border-indigo-100 dark:border-indigo-900/30 text-sm text-slate-700 dark:text-slate-300">
          {answer}
        </div>
      )}
    </div>
  );
}

// ─── Collapsible Component ──────────────────────────────────────────
function Collapsible({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
      >
        {open ? "▼" : "▶"} {title}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function NJ03Decorators(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                <span className="font-display font-bold text-sm tracking-wider">NJ-03</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Decorators Deep Dive</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-amber-600" /></div>
                  <h4 className="font-display text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Core Concept</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Decorators are functions that attach metadata to classes, methods, properties, or parameters using the @ syntax. They are THE defining feature of NestJS.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div>
                  <h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">Why NestJS Needs This</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">@Module, @Controller, @Injectable, @Get, @Post, @Body, @Param, @UseGuards — every NestJS building block IS a decorator.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div>
                  <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express has no decorators. You wire everything manually. NestJS decorators are declarative — they describe WHAT your code does, not HOW.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div>
                  <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Learning Goal</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Build and understand all 4 types of decorators. After this, NestJS code stops looking like magic.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 1: What are Decorators?                                     */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. What Are Decorators?</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">

            {/* What is this? */}
            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is a Decorator?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A decorator is just a <strong>function that adds extra information or behavior</strong> to something — a class, a method, a property, or a function parameter. You apply it using the <code className="text-sky-600">@</code> symbol. The decorator runs <em>automatically</em> when the class is loaded — you don&apos;t call it yourself.
              </p>
            </div>

            {/* Sticker Analogy */}
            <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8 flex gap-5 items-start">
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
            <div className="p-4 bg-red-500/5 rounded-xl border border-red-200/50 dark:border-red-500/20 mb-6">
              <h5 className="text-xs font-bold text-red-600 mb-2 flex items-center gap-1">
                <span>⚙️</span> Required Setup — tsconfig.json
              </h5>
              <pre className="bg-gray-900 text-slate-300 p-3 rounded-lg overflow-x-auto text-sm border border-slate-800">
                {`// You MUST enable these two flags for decorators to work:
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true   // NestJS needs this for DI
  }
}
// NestJS projects have this enabled by default.`}
              </pre>
            </div>

            {/* Decorator vs Decorator Factory */}
            <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-6">
              <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3">Key Concept: Decorator vs Decorator Factory</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <p className="font-bold text-slate-900 dark:text-white mb-1">Plain Decorator</p>
                  <p className="mb-2">No parentheses. Runs directly.</p>
                  <code className="text-amber-600 block bg-gray-900 p-2 rounded text-xs">@Logger<br/>class MyService {`{}`}</code>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <p className="font-bold text-slate-900 dark:text-white mb-1">Decorator Factory</p>
                  <p className="mb-2">Has parentheses. Returns a decorator. Takes options.</p>
                  <code className="text-amber-600 block bg-gray-900 p-2 rounded text-xs">@Controller(&apos;users&apos;)<br/>class UsersController {`{}`}</code>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3">NestJS uses <strong>Decorator Factories</strong> almost everywhere because they need to accept configuration (like the route path).</p>
            </div>

            <QuickCheck
              question={`What's the difference between "@Logger" and "@Controller('users')"?`}
              answer={`@Logger is a plain decorator — it's a function that runs directly on the class. @Controller('users') is a Decorator Factory — it's a function that takes an argument ('users') and RETURNS a decorator function. The factory pattern lets you pass configuration to the decorator. NestJS uses factories because it needs the route prefix, module config, etc.`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 2: Class Decorators                                         */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Class Decorators</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">

            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is a Class Decorator?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A class decorator is applied to the <strong>entire class</strong>. It receives the class constructor as its argument. It can add metadata, modify the class, or even replace it entirely. In NestJS, class decorators tell the framework <em>what kind of class this is</em>.
              </p>
            </div>

            <div className="space-y-6">
              {/* Simple example */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                  Build Your Own — Simple Class Decorator
                </h4>
                <p className="text-sm text-slate-500 mb-3">A decorator is just a function. The simplest decorator logs when a class is created:</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// Step 1: Create a function that takes a constructor
function Logger(constructor: Function) {
  console.log(\`✅ Class created: \${constructor.name}\`);
}

// Step 2: Apply it with @
@Logger
class UserService {
  getUsers() { return ["Alice", "Bob"]; }
}

// When this file loads, the console AUTOMATICALLY prints:
// "✅ Class created: UserService"
// You didn't call Logger() yourself — the @ did it for you!`}
                </pre>
              </div>

              {/* Decorator Factory */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                  Decorator Factory — With Arguments (NestJS Pattern)
                </h4>
                <p className="text-sm text-slate-500 mb-3">What if you want to pass options to the decorator? You create a <strong>factory</strong> — a function that returns a function:</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// A Decorator Factory — function that RETURNS a decorator
function Controller(prefix: string) {
  // The outer function takes the argument
  return function (constructor: Function) {
    // The inner function IS the decorator
    Reflect.defineMetadata("prefix", prefix, constructor);
    console.log(\`Route prefix set: /\${prefix}\`);
  };
}

// Usage — notice the parentheses!
@Controller("users")
class UsersController {
  // NestJS reads the "users" metadata to map routes
  // All methods inside this class → /users/*
}

// Output: "Route prefix set: /users"`}
                </pre>
              </div>

              {/* NestJS real decorators */}
              <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                <h4 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-3">The 3 Most Important NestJS Class Decorators</h4>
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-3">
                    <code className="text-blue-600 font-bold shrink-0 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded">@Controller(&apos;path&apos;)</code>
                    <span>→ Marks a class as a route handler. All methods inside handle HTTP requests for <code>/path/*</code></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="text-blue-600 font-bold shrink-0 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded">@Injectable()</code>
                    <span>→ Marks a class as a service that can be injected into other classes via the constructor</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="text-blue-600 font-bold shrink-0 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded">@Module({`{...}`})</code>
                    <span>→ Defines a module with its imports, controllers, and providers (services)</span>
                  </div>
                </div>
              </div>
            </div>

            <QuickCheck
              question={`Why does @Controller('users') need parentheses but @Logger doesn't?`}
              answer={`@Logger is a plain decorator — it IS the decorator function. @Controller('users') is a Decorator Factory — it's a function that takes 'users' as an argument and RETURNS the actual decorator function. The parentheses call the outer function, which then returns the inner decorator. Whenever a decorator needs configuration, you use a factory.`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 3: Method Decorators                                        */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Method Decorators</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">

            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is a Method Decorator?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A method decorator is applied to a <strong>single method</strong> inside a class. It can wrap the method with extra behavior (like logging), add metadata (like &quot;this is a GET endpoint&quot;), or even replace the method entirely. Think of it as wrapping a gift — the gift (method) is still inside, but the wrapper adds something extra.
              </p>
            </div>

            {/* 3 arguments explainer */}
            <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8">
              <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3">The 3 Arguments Every Method Decorator Receives</h4>
              <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-decimal pl-5">
                <li><code className="text-amber-600 font-bold">target</code> — The class prototype (the object this method belongs to)</li>
                <li><code className="text-amber-600 font-bold">propertyKey</code> — The name of the method (as a string, like <code>&quot;add&quot;</code>)</li>
                <li><code className="text-amber-600 font-bold">descriptor</code> — An object that contains the actual function. <code>descriptor.value</code> is the method itself.</li>
              </ol>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                  Build Your Own — @Log Decorator
                </h4>
                <p className="text-sm text-slate-500 mb-3">This decorator wraps a method to log its inputs and outputs:</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // Step 1: Save the original method
  const originalMethod = descriptor.value;

  // Step 2: Replace it with a new version that adds logging
  descriptor.value = function (...args: any[]) {
    console.log(\`📞 Calling \${propertyKey} with args:\`, args);
    const result = originalMethod.apply(this, args);  // Run the original
    console.log(\`✅ \${propertyKey} returned:\`, result);
    return result;
  };
}

class MathService {
  @Log   // ← Apply the decorator to this specific method
  add(a: number, b: number): number {
    return a + b;
  }
}

const math = new MathService();
math.add(2, 3);
// Output:
// 📞 Calling add with args: [2, 3]
// ✅ add returned: 5`}
                </pre>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                  How NestJS Uses Method Decorators
                </h4>
                <p className="text-sm text-slate-500 mb-3">NestJS method decorators don&apos;t wrap the method — they <strong>add metadata</strong> that NestJS reads at startup:</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// Simplified version of how @Get() works internally:
function Get(path: string = "") {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Attach metadata: "this method handles GET requests at this path"
    Reflect.defineMetadata("method", "GET", descriptor.value);
    Reflect.defineMetadata("path", path, descriptor.value);
  };
}

// When you write this in NestJS:
@Controller('users')
class UsersController {
  @Get()         // GET /users
  findAll() { return []; }

  @Get(':id')    // GET /users/123
  findOne() { return {}; }

  @Post()        // POST /users
  create() { return {}; }
}
// NestJS reads the metadata at startup and auto-registers all routes!`}
                </pre>
              </div>

              {/* Key NestJS method decorators */}
              <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                <h4 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-3">Common NestJS Method Decorators</h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <div><code className="text-blue-600 font-bold">@Get()</code> → handle GET requests</div>
                  <div><code className="text-blue-600 font-bold">@Post()</code> → handle POST requests</div>
                  <div><code className="text-blue-600 font-bold">@Put()</code> → handle PUT requests</div>
                  <div><code className="text-blue-600 font-bold">@Delete()</code> → handle DELETE requests</div>
                  <div><code className="text-blue-600 font-bold">@Patch()</code> → handle PATCH requests</div>
                  <div><code className="text-blue-600 font-bold">@UseGuards()</code> → apply authentication</div>
                </div>
              </div>
            </div>

            <QuickCheck
              question={`In a method decorator, "descriptor.value" contains the original method. Why do we use "originalMethod.apply(this, args)" instead of just "originalMethod(args)"?`}
              answer={`.apply(this, args) preserves the "this" context. If you just call originalMethod(args), "this" inside the method would be undefined (or the wrong object). .apply() makes sure "this" still refers to the class instance, so this.someProperty works correctly inside the wrapped method.`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 4: Parameter Decorators                                     */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Parameter Decorators</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">

            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is a Parameter Decorator?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A parameter decorator marks a <strong>specific parameter</strong> of a method. It tells the framework: &quot;Fill this parameter with a specific piece of data from the incoming request.&quot; This is how NestJS <em>automatically</em> extracts <code className="text-sky-600">req.body</code>, <code className="text-sky-600">req.params</code>, and <code className="text-sky-600">req.query</code> for you.
              </p>
            </div>

            {/* Express vs NestJS parameter handling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-red-500/5 rounded-xl border border-red-100 dark:border-red-900/30">
                <h5 className="text-xs font-bold text-red-600 uppercase mb-2">Express — Manual Extraction</h5>
                <pre className="bg-gray-900 text-slate-300 p-2.5 rounded-lg overflow-x-auto text-[11px] border border-slate-800">
                  {`app.post('/users', (req, res) => {
  const body = req.body;       // manual
  const id = req.params.id;    // manual
  const page = req.query.page; // manual
});`}
                </pre>
              </div>
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                <h5 className="text-xs font-bold text-emerald-600 uppercase mb-2">NestJS — Auto via Decorators</h5>
                <pre className="bg-gray-900 text-slate-300 p-2.5 rounded-lg overflow-x-auto text-[11px] border border-slate-800">
                  {`@Post()
create(
  @Body() dto: CreateUserDto,   // auto!
  @Param('id') id: string,      // auto!
  @Query('page') page: number,  // auto!
) { }`}
                </pre>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                  How a Parameter Decorator Works Under the Hood
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// A parameter decorator receives 3 arguments:
function Body(target: any, propertyKey: string, parameterIndex: number) {
  // target         = class prototype
  // propertyKey    = method name (e.g., "createUser")
  // parameterIndex = which parameter (0, 1, 2...)
  
  console.log(\`@Body applied to parameter \${parameterIndex} of \${propertyKey}\`);
  // Output: "@Body applied to parameter 0 of createUser"
}

class UsersController {
  createUser(@Body dto: any) {
    // NestJS reads the @Body metadata and automatically
    // extracts req.body and passes it as the 'dto' argument
  }
}`}
                </pre>
              </div>

              {/* Full NestJS param decorator reference */}
              <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                <h4 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-3">NestJS Parameter Decorator Cheat Sheet</h4>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Body()</code><span>→ <code>req.body</code> — the full request body</span></div>
                  <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Body(&apos;name&apos;)</code><span>→ <code>req.body.name</code> — a specific field from the body</span></div>
                  <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Param(&apos;id&apos;)</code><span>→ <code>req.params.id</code> — URL parameter like <code>/users/:id</code></span></div>
                  <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Query(&apos;page&apos;)</code><span>→ <code>req.query.page</code> — query string like <code>?page=2</code></span></div>
                  <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Headers(&apos;auth&apos;)</code><span>→ <code>req.headers.auth</code> — specific request header</span></div>
                  <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Req()</code><span>→ the raw Express <code>Request</code> object (escape hatch)</span></div>
                  <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Res()</code><span>→ the raw Express <code>Response</code> object (escape hatch)</span></div>
                </div>
              </div>
            </div>

            <QuickCheck
              question={`In NestJS, how do you extract the 'id' from a URL like GET /users/42?`}
              answer={`Use the @Param('id') decorator on the method parameter: findOne(@Param('id') id: string). NestJS reads the metadata and automatically extracts req.params.id and passes "42" as the id argument. You never touch req.params yourself.`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 5: Property Decorators                                      */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Property Decorators</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">

            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is a Property Decorator?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A property decorator is applied to a <strong>class property</strong> (a variable inside a class). It adds metadata about that property — like &quot;this should be a database column&quot; or &quot;this must be a valid email.&quot; NestJS uses these extensively with <strong>TypeORM</strong> (database) and <strong>class-validator</strong> (input validation).
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                  Build Your Own — @Column Decorator
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// Simplified version of how @Column works in TypeORM
function Column(options?: { type?: string; nullable?: boolean }) {
  return function (target: any, propertyKey: string) {
    // Store column metadata on the class
    Reflect.defineMetadata("column", options || {}, target, propertyKey);
    // TypeORM later reads this to create the database table!
  };
}

function IsEmail() {
  return function (target: any, propertyKey: string) {
    // Store validation rule: "this property must be an email"
    Reflect.defineMetadata("validation", "email", target, propertyKey);
  };
}

// Usage — each property gets its own "sticker"
class User {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  @IsEmail()                     // ← Two decorators on one property!
  email: string;

  @Column({ type: "boolean", nullable: true })
  isActive: boolean;
}`}
                </pre>
              </div>

              {/* Real-world NestJS usage */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                  Real NestJS Usage — TypeORM Entity + Validation DTO
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// TypeORM Entity — defines a database table
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()                              // ← Class decorator: "this is a DB table"
class User {
  @PrimaryGeneratedColumn()            // ← Auto-generated ID column
  id: number;

  @Column()                            // ← Regular column
  name: string;

  @Column({ unique: true })            // ← Unique column
  email: string;
}

// Validation DTO — defines input rules
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

class CreateUserDto {
  @IsString()                          // ← Must be a string
  @IsNotEmpty()                        // ← Cannot be empty
  name: string;

  @IsEmail()                           // ← Must be valid email format
  email: string;
}`}
                </pre>
              </div>
            </div>

            <QuickCheck
              question={`Can you apply multiple decorators to the same property?`}
              answer={`Yes! You can stack as many decorators as you need. They execute from bottom to top. For example, @Column() + @IsEmail() on the "email" property sets up both the database column AND the validation rule. This is very common in NestJS.`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 6: Express vs NestJS                                        */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">6. Express vs NestJS — With Decorators</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express (manual wiring)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Every route must be manually registered
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateBody, createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, admin, deleteUser);

app.use("/users", router);
// 👆 Lots of manual wiring`}
              </pre>
              <p className="text-xs text-red-600 dark:text-red-400 mt-3 italic">
                ⚠️ Route registration is separate from the handler. You have to trace two files to understand one endpoint.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS (declarative)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`@Controller('users')
class UsersController {
  @Get()
  findAll() { ... }

  @Get(':id')
  findOne(@Param('id') id: string) { ... }

  @Post()
  create(@Body() dto: CreateUserDto) { ... }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id, @Body() dto) { ... }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  remove(@Param('id') id: string) { ... }
}
// 👆 Self-documenting, declarative`}
              </pre>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 italic">
                ✅ Everything is in one place. The decorator <em>IS</em> the documentation. You can read the route, method, guards, and parameters at a glance.
              </p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Mini Challenge                                                     */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <p className="text-amber-900 dark:text-amber-300 mb-4">Create your own decorators:</p>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@Deprecated</code> class decorator that logs a warning when the class is instantiated</li>
            <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@MeasureTime</code> method decorator that logs how long a method takes to execute</li>
            <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@Validate</code> parameter decorator that checks if a parameter is not null/undefined</li>
          </ul>

          <Collapsible title="💡 Show Solution (try it yourself first!)">
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// 1. @Deprecated — Class Decorator
function Deprecated(constructor: Function) {
  console.warn(\`⚠️ WARNING: \${constructor.name} is deprecated!\`);
}

@Deprecated
class OldUserService {
  // Console: "⚠️ WARNING: OldUserService is deprecated!"
}

// 2. @MeasureTime — Method Decorator
function MeasureTime(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = original.apply(this, args);
    const end = performance.now();
    console.log(\`⏱️ \${key} took \${(end - start).toFixed(2)}ms\`);
    return result;
  };
}

class DataService {
  @MeasureTime
  processData() {
    // ... heavy computation
    return "done";
  }
}
// Output: "⏱️ processData took 12.34ms"

// 3. @Validate — Parameter Decorator
// Note: Parameter decorators can only ADD metadata.
// The actual validation logic runs in a separate interceptor.
function Validate(target: any, key: string, index: number) {
  const existingParams: number[] = 
    Reflect.getOwnMetadata("validate_params", target, key) || [];
  existingParams.push(index);
  Reflect.defineMetadata("validate_params", existingParams, target, key);
}

class OrderService {
  createOrder(@Validate orderId: string) {
    return \`Order \${orderId} created\`;
  }
}`}
            </pre>
          </Collapsible>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Common Mistakes                                                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Forgetting to enable <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">experimentalDecorators</code> and <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">emitDecoratorMetadata</code> in tsconfig.</li>
            <li>Applying decorators in the wrong order — they execute <strong>bottom-to-top</strong> for methods, <strong>left-to-right</strong> for parameters.</li>
            <li>Trying to use decorators in plain .js files — they require TypeScript.</li>
            <li>Confusing decorator factories (functions that <em>return</em> decorators, with parentheses) with plain decorators (without parentheses).</li>
            <li>Writing <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">@Injectable</code> without parentheses — NestJS factories <strong>always need ()</strong>, even with no arguments.</li>
          </ul>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Summary (NEW)                                                      */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-6 p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white flex items-center gap-2">
            🧠 What You Learned
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold px-2 py-1 rounded shrink-0">1</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Class Decorators</strong> — Sticker on the whole class. <code className="text-purple-600">@Controller</code>, <code className="text-purple-600">@Injectable</code>, <code className="text-purple-600">@Module</code></p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded shrink-0">2</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Method Decorators</strong> — Sticker on a method. <code className="text-blue-600">@Get</code>, <code className="text-blue-600">@Post</code>, <code className="text-blue-600">@UseGuards</code></p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-xs font-bold px-2 py-1 rounded shrink-0">3</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Parameter Decorators</strong> — Sticker on a function parameter. <code className="text-rose-600">@Body</code>, <code className="text-rose-600">@Param</code>, <code className="text-rose-600">@Query</code></p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded shrink-0">4</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Property Decorators</strong> — Sticker on a property. <code className="text-emerald-600">@Column</code>, <code className="text-emerald-600">@IsEmail</code>, <code className="text-emerald-600">@IsNotEmpty</code></p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded shrink-0">!</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Decorators = Metadata</strong> — They don&apos;t change your code. They label it so the framework knows how to wire it together.</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 text-xs font-bold px-2 py-1 rounded shrink-0">⚡</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Factory vs Plain</strong> — <code>@Logger</code> = plain decorator. <code>@Controller(&apos;users&apos;)</code> = factory that returns a decorator.</p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Next Step                                                          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            You now understand how decorators work under the hood. Move to <Link href="/learn/nestjs/nj04-solid" className="font-bold underline hover:text-emerald-600">NJ-04 — SOLID Principles</Link> to learn the architectural principles that make NestJS code scalable and maintainable.
          </p>
        </section>
      </div>
    </>
  );
}
