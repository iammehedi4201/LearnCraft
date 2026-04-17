/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-01 — TypeScript Essentials
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * TypeScript adds static typing to JavaScript. NestJS is built entirely in
 * TypeScript and relies heavily on types, interfaces, generics, and enums
 * to provide compile-time safety and rich developer tooling.
 *
 * WHY THIS MATTERS FOR NESTJS
 * ───────────────────────────
 * Every NestJS controller, service, module, guard, pipe, and interceptor is
 * a TypeScript class. Understanding TS fundamentals is non-negotiable.
 *
 * EXPRESS.JS COMPARISON
 * ─────────────────────
 * Express can be written in plain JS — no types required. NestJS enforces
 * TypeScript, which catches bugs at compile time instead of runtime.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ01TypeScript(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                <span className="font-display font-bold text-sm tracking-wider">NJ-01</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                TypeScript Essentials
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  </div>
                  <h4 className="font-display text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                    Core Concept
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">TypeScript adds static typing to JavaScript. NestJS is built entirely in TypeScript and relies on types, interfaces, generics, and enums for compile-time safety.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                  </div>
                  <h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
                    Why NestJS Needs This
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Every NestJS controller, service, module, guard, pipe, and interceptor is a TypeScript class. Understanding TS fundamentals is non-negotiable.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  </div>
                  <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    Express.js Comparison
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express can be written in plain JS — no types required. NestJS enforces TypeScript, catching bugs at compile time instead of runtime.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  </div>
                  <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    Learning Goal
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">By the end: confidently use types, interfaces, enums, generics, and type narrowing in real code.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
        </div>

        {/* Section 1: Basic Types */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Basic Types</h2>

          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">Primitive & Core Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Primitives</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">The building blocks: <code className="text-blue-600">string</code>, <code className="text-blue-600">number</code>, and <code className="text-blue-600">boolean</code>. They enforce data integrity at the lowest level.</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Collections</h4>
                  <p className="text-xs text-slate-500 leading-relaxed"><code className="text-blue-600">Array</code> for lists and <code className="text-blue-600">Tuple</code> for fixed-length arrays with specific positions (e.g., <code className="text-blue-600">[lat, lng]</code>).</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Any vs Unknown</h4>
                  <p className="text-xs text-slate-500 leading-relaxed"><code className="text-red-500 font-bold">Avoid any</code> as it disables type checking. Use <code className="text-blue-600 font-bold">unknown</code> when you don't know the type yet—it forces you to verify it before use.</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Enums</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Named constants that make your code more readable and prevent "magic strings" in your logic.</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">The "Aha!" Moment: The DNA of your data</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Think of types as **DNA**. Just as DNA tells a cell whether it's part of a muscle or a bone, TypeScript tells your editor what a variable is allowed to do. If you try to make it do something "unnatural" (like calling <code className="text-amber-600">.toUpperCase()</code> on a number), TypeScript warns you immediately.
                </p>
              </div>
            </div>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Basic Types
let userName: string = "Mehedi";
let age: number = 25;
let isActive: boolean = true;

// ✅ Arrays
let scores: number[] = [95, 87, 92];
let names: Array<string> = ["Alice", "Bob"];

// ✅ Tuple — fixed-length array with specific types
let user: [string, number] = ["Mehedi", 25];

// ✅ Enum — named constants
enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}
let myRole: Role = Role.ADMIN;

// ✅ Any vs Unknown
let flexible: any = "anything";      // ⚠️ Avoid — disables type checking
let safe: unknown = "check first";   // ✅ Better — forces type checking before use

// ✅ Void & Never
function logMessage(msg: string): void {
  console.log(msg);  // returns nothing
}

function throwError(msg: string): never {
  throw new Error(msg);  // never returns
}`}
            </pre>
          </div>
        </section>

        {/* Section 2: Interfaces vs Types */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Interfaces vs Type Aliases</h2>

          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">Choosing the Right Tool</h3>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 mb-8">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <span className="text-blue-600 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">Interfaces for Entities & DTOs</h5>
                    <p className="text-slate-500 text-xs mt-1">NestJS heavily favors interfaces for defining the shape of data. They support "Declaration Merging," meaning you can add properties to existing interfaces from different files.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <span className="text-indigo-600 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">Types for Unions & Aliases</h5>
                    <p className="text-slate-500 text-xs mt-1">Use Type Aliases for complex combinations like Union types (<code className="text-indigo-600">string | number</code>) or Intersection types. Once a Type is declared, it cannot be changed.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">Mental Model: The Architectural Blueprint</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  An **Interface** is like a house blueprint. It doesn't build the house, but it defines where the doors and windows *must* go. You use Interfaces to set a "Contract" for objects. **Types**, on the other hand, are like "Nicknames" (Aliases) for shortcuts or complex instructions.
                </p>
              </div>
            </div>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Interface — best for object shapes (NestJS prefers these)
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";       // union type for specific values
  avatar?: string;              // optional property
  readonly createdAt: Date;     // cannot be reassigned
}

// ✅ Extending interfaces (common in NestJS DTOs)
interface CreateUserDto {
  name: string;
  email: string;
}

interface UpdateUserDto extends Partial<CreateUserDto> {
  // All fields are now optional
}

// ✅ Type alias — best for unions, intersections, primitives
type ID = string | number;
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// 🔑 KEY DIFFERENCE:
// Interfaces can be merged (declaration merging)
// Types cannot — they are fixed once declared
interface Config {
  host: string;
}
interface Config {
  port: number;    // ✅ Merges with above — Config now has host + port
}`}
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-400">
              🏗️ NestJS Convention
            </h3>
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Use interfaces</strong> for DTOs, entity shapes, and service contracts. NestJS uses interfaces extensively for defining the shape of data flowing through controllers, services, and repositories.
            </p>
          </div>
        </section>

        {/* Section 3: Generics */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Generics — Reusable Type Patterns</h2>

          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">Why Generics Matter</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Generics are "type variables." They allow you to define a component (function, class, or interface) that can work with any type, while maintaining full type safety. Think of it as a <span className="font-bold text-blue-600">placeholder</span> that gets replaced with a real type when the code is used.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-500/5">
                <h5 className="text-xs font-bold text-blue-600 uppercase mb-1">Flexibility</h5>
                <p className="text-[11px] text-slate-500">Works with strings today, objects tomorrow—without repeating code.</p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-500/5">
                <h5 className="text-xs font-bold text-emerald-600 uppercase mb-1">Precision</h5>
                <p className="text-[11px] text-slate-500">Unlike <code className="text-slate-700 font-bold">any</code>, generics remember the exact type that was passed in.</p>
              </div>
            </div>
            <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">Metaphor: The Universal Adapter</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Imagine a shipping crate (a **Generic**). It doesn't care if it's carrying toys, electronics, or food—it handles them all the same. However, once you label it as a "Toy Crate," TypeScript ensures you only pull out toys. Generics let you build powerful, reusable tools without losing track of what's inside.
                </p>
              </div>
            </div>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Generic function
function wrapInArray<T>(item: T): T[] {
  return [item];
}

wrapInArray<string>("hello");  // string[]
wrapInArray<number>(42);       // number[]

// ✅ Generic interface (common in NestJS API responses)
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: Date;
}

// Usage:
const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "Mehedi", email: "m@e.com", role: "admin", createdAt: new Date() },
  timestamp: new Date(),
};

// ✅ Generic class (NestJS repository pattern)
class BaseRepository<T> {
  private items: T[] = [];

  findAll(): T[] {
    return this.items;
  }

  create(item: T): T {
    this.items.push(item);
    return item;
  }
}

const userRepo = new BaseRepository<User>();
const productRepo = new BaseRepository<Product>();

// ✅ Generic with constraints
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}`}
            </pre>
          </div>
        </section>

        {/* Section 4: Type Narrowing */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Type Narrowing & Type Guards</h2>

          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">How to handle multiple types safely</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              When a variable could be one of several types (a <span className="italic">union</span>), you must "narrow" it down before you can access specific properties. TypeScript "remembers" the narrowing logic within that scope.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">typeof</span>
                Checks primitive types like <code className="text-blue-500">string</code> or <code className="text-blue-500">number</code>.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">instanceof</span>
                Checks if an object is an instance of a specific <code className="text-blue-500">class</code>.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">in</span>
                Checks if a specific property exists on an object.
              </div>
            </div>
            <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">Mental Model: The Logical Security Gate</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Type Narrowing is like a security checkpoint. If you have any identity (a <span className="italic">union type</span>), you're not allowed in the VIP room. But, if you provide a specific ID card (using <code className="text-purple-600">typeof</code> or <code className="text-purple-600">instanceof</code>), the gate opens, and for that moment, TypeScript *guarantees* you are who you say you are.
                </p>
              </div>
            </div>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ typeof guard
function processInput(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase();   // TS knows it's string here
  }
  return input.toFixed(2);        // TS knows it's number here
}

// ✅ instanceof guard
class HttpError {
  constructor(public status: number, public message: string) {}
}

function handleError(error: unknown) {
  if (error instanceof HttpError) {
    console.log(error.status);    // TS knows it's HttpError
  }
}

// ✅ Custom type guard (used in NestJS guards & pipes)
interface AdminUser {
  role: "admin";
  permissions: string[];
}

interface RegularUser {
  role: "user";
}

type AppUser = AdminUser | RegularUser;

function isAdmin(user: AppUser): user is AdminUser {
  return user.role === "admin";
}

function getPermissions(user: AppUser) {
  if (isAdmin(user)) {
    return user.permissions;   // TS knows it's AdminUser
  }
  return [];
}`}
            </pre>
          </div>
        </section>

        {/* Express Comparison */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Express.js vs NestJS — Types in Action</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">❌ Express.js (no types)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// No type safety — bugs hide until runtime
app.post('/users', (req, res) => {
  const name = req.body.name;  
  // is name a string? a number? 
  // undefined? We don't know!
  
  const user = createUser(name);
  res.json(user);
});`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">✅ NestJS (full type safety)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Types enforce correctness at compile time
@Post()
create(@Body() dto: CreateUserDto): User {
  // dto is guaranteed to match
  // CreateUserDto shape
  // Validated before this runs!
  
  return this.userService.create(dto);
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Mini Challenge */}
        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">
            🏋️ Mini Challenge
          </h3>
          <p className="text-amber-900 dark:text-amber-300 mb-4">
            Create the following TypeScript types for a blog API:
          </p>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">Post</code> interface with id, title, content, author, tags (array), and createdAt</li>
            <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">CreatePostDto</code> that omits id and createdAt</li>
            <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">UpdatePostDto</code> that makes all CreatePostDto fields optional</li>
            <li>A generic <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">{"PaginatedResponse<T>"}</code> with data array, total, page, and limit</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">
            ⚠️ Common Mistakes
          </h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">any</code> everywhere — it completely disables type checking. Use <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">unknown</code> instead.</li>
            <li>Not using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">strict: true</code> in tsconfig — NestJS projects should always have strict mode on.</li>
            <li>Confusing interfaces and types — use interfaces for object shapes (NestJS convention), types for unions and primitives.</li>
            <li>Forgetting <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">readonly</code> on properties that shouldn't change after creation.</li>
          </ul>
        </section>

        {/* Next Step */}
        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">
            📝 Next Step
          </h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            Now that you understand TypeScript basics, move to <Link href="/learn/nestjs/nj02-oop-foundations" className="font-bold underline hover:text-emerald-600">NJ-02 — OOP Foundations</Link> to learn Classes, Inheritance, and the OOP patterns NestJS is built on.
          </p>
        </section>
      </div>
    </>
  );
}
