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
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">Primitive Types</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">TypeScript has explicit types for strings, numbers, booleans, arrays, and more. These catch type errors before your code even runs.</p>
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
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">When to use each</h3>
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
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Generics let you write reusable code that works with <em>any</em> type while still being type-safe. NestJS uses generics heavily in its core APIs.</p>
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
