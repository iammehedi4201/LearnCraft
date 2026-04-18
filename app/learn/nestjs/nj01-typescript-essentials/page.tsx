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
                    Plain English Concept
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">TypeScript is just JavaScript with rules. It acts like a spell-checker for your code. If you try to do math with a word, it stops you *before* the code runs.</p>
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
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS relies on these rules to connect all the pieces of your app safely. Every file you make in NestJS will use these labels to prevent mistakes.</p>
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
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">In Express (JavaScript), bugs hide until a user clicks a button and the app crashes. In NestJS (TypeScript), bugs are caught immediately while you are typing.</p>
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
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">We will break down Types, Interfaces, Generics, and Enums into simple ideas so you can write foolproof code.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
        </div>

        {/* Section 1: Basic Types */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Basic Types</h2>

          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">The 4 Basic Labels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">1. The Basic Blocks</h4>
                <p className="text-xs text-slate-500 leading-relaxed flex-grow">The simplest data: text (<code className="text-blue-600">string</code>), math numbers (<code className="text-blue-600">number</code>), and simple Yes/No switches (<code className="text-blue-600">boolean</code>).</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">3. The "I Don't Know" Box</h4>
                <p className="text-xs text-slate-500 leading-relaxed flex-grow"><code className="text-red-500 font-bold">any</code> means "Turn off all rules" (Dangerous!). <code className="text-blue-600 font-bold">unknown</code> means "I'm not sure what this is yet, let me check before I use it" (Safe!).</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">2. Lists (Arrays & Tuples)</h4>
                <p className="text-xs text-slate-500 leading-relaxed flex-grow"><code className="text-blue-600">Array</code> is just a list of items (like a shopping list). <code className="text-blue-600">Tuple</code> is a strict list where every spot has a rule (e.g., Spot 1 must be Name, Spot 2 must be Age).</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">4. Enums (Dropdown Menus)</h4>
                <p className="text-xs text-slate-500 leading-relaxed flex-grow">Like a dropdown menu of choices. If the only choices are Admin, User, or Guest, an Enum stops someone from accidentally typing "SuperAdmin".</p>
              </div>
            </div>
            <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">In Plain English: Labeled Boxes</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Imagine you have several boxes. If you label a box **"Clothes"**, you shouldn't put **"Food"** in it. TypeScript works exactly like this. By giving variables a "Type" (like <code className="text-amber-600">string</code> or <code className="text-amber-600">number</code>), you are labeling them. If you try to put a number into a box labeled for words, TypeScript will stop you before you make a mistake.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span> 
                  Plain TypeScript Example
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// 1. The Basic Blocks
let userName: string = "Mehedi";
let age: number = 25;
let isActive: boolean = true;

// 2. Lists (Arrays & Tuples)
let roles: string[] = ["admin", "user"];
let userTuple: [string, number] = ["Mehedi", 25]; // Strict list: [Name, Age]

// 3. The "I Don't Know" Box
let unknownValue: any = "anything";      // ⚠️ Turns off all rules (Dangerous!)
let safeValue: unknown = "check first";  // ✅ Must check before using (Safe!)

// 4. Enums (Dropdown Menus)
enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span> 
                  How it is used in NestJS
                </h4>
                <p className="text-sm text-slate-500 mb-3">In NestJS, we use these basic types and enums to define exactly what data a Controller or Service expects.</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  
  @Get(':id')
  // The 'id' parameter is strictly forced to be a string
  // The function promises to return a string
  getUser(@Param('id') id: string): string {
    return \`User ID: \${id}\`;
  }
  
  @Get()
  // The 'role' must be one of our exact Enum choices
  getUsersByRole(@Query('role') role: Role): string[] {
    if (role === Role.ADMIN) {
      return ["Alice", "Bob"];
    }
    return [];
  }
}`}
                </pre>
              </div>
            </div>
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
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">Interfaces = Blueprints</h5>
                    <p className="text-slate-500 text-xs mt-1">An Interface is just a blueprint for an object. It says: "A User object must have a name, an email, and an age." You can easily add more rules to a blueprint later if you need to.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <span className="text-indigo-600 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">Types = Nicknames</h5>
                    <p className="text-slate-500 text-xs mt-1">A Type is like giving a nickname to something. If an ID can be a number OR a string, you can just call it <code className="text-indigo-600">IDType</code>. Once you make a nickname, you can't change it.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Simple Concept: A List of Rules</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  An **Interface** is just a simple "List of Rules" for an object. For example, if you say a **User** object *must* have a name and an email, TypeScript will make sure you don't forget them. It's like a contract—as long as you follow the rules, your code is safe.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span> 
                  Plain TypeScript Example
                </h4>
                <p className="text-sm text-slate-500 mb-3">An interface is a blueprint for an object.</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// 1. Interfaces = Blueprints for objects
interface User {
  name: string;
  email: string;
  age: number;
}

const newUser: User = {
  name: "Alice",
  email: "alice@example.com",
  age: 28
};

// 2. Types = Nicknames
// An IDType can be EITHER a number OR a string
type IDType = number | string;

let myId: IDType = 101; 
let yourId: IDType = "USER-101";`}
                </pre>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span> 
                  How it is used in NestJS
                </h4>
                <p className="text-sm text-slate-500 mb-3">In NestJS, Interfaces (and Classes) act as DTOs (Data Transfer Objects). They serve as the exact blueprint for incoming request bodies!</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// NestJS DTO blueprint
interface CreateUserDto {
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  
  @Post()
  // NestJS uses the CreateUserDto blueprint to validate
  // the incoming request body before the code even runs!
  create(@Body() body: CreateUserDto) {
    return \`Creating user \${body.name} with email \${body.email}\`;
  }
}`}
                </pre>
              </div>
            </div>
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
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">The Power of Generics</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Sometimes you want to build a tool that works with *any* type of data, but without turning off the rules using `any`. Generics are like a <span className="font-bold text-blue-600">fill-in-the-blank</span> label. You don't say what type it is right away; you let the person using the tool fill in the blank!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-500/5">
                <h5 className="text-xs font-bold text-blue-600 uppercase mb-1">Write Once, Use Anywhere</h5>
                <p className="text-[11px] text-slate-500">Instead of building a "Cat List" and a "Dog List," just build an "Animal List" and fill in the blank later.</p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-500/5">
                <h5 className="text-xs font-bold text-emerald-600 uppercase mb-1">Perfect Memory</h5>
                <p className="text-[11px] text-slate-500">If you fill the blank with "Dog", TypeScript will strictly remember it is a Dog, unlike <code className="text-slate-700 font-bold">any</code>.</p>
              </div>
            </div>
            <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Easy View: The Flexible Box</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A **Generic** is like a box that can hold anything, but it still remembers what's inside. Imagine a box labeled "Item Box." You can put a toy in it, or a book. But once you put a toy in, the box *becomes* a **Toy Box**. Generics lets you build things that work for many different items without losing track of what they are.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span> 
                  Plain TypeScript Example
                </h4>
                <p className="text-sm text-slate-500 mb-3">A generic "fill-in-the-blank" function.</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// 1. A generic Class (Matches the "Item Box" analogy)
class ItemBox<T> {
  item: T;
  
  constructor(item: T) {
    this.item = item;
  }
  
  getItem(): T {
    return this.item;
  }
}

const stringBox = new ItemBox<string>("A shiny new toy");
const myToy = stringBox.getItem();  // TS remembers this is a string

// 2. A generic Interface (Matches the "Animal List" analogy)
interface AnimalList<T> {
  animals: T[];
  add(animal: T): void;
}

type Dog = { name: string, barks: boolean };
type Cat = { name: string, purrs: boolean };

// Create a list completely strictly tailored to Dogs!
const dogList: AnimalList<Dog> = {
  animals: [],
  add: (dog) => console.log("Added dog: " + dog.name)
};`}
                </pre>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span> 
                  How it is used in NestJS
                </h4>
                <p className="text-sm text-slate-500 mb-3">In NestJS, Generics are used heavily to create reusable API wrappers and reusable Database services.</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// Universal API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: Date;
}

@Injectable()
export class UserService {
  
  // This service returns an ApiResponse, filled in with a 'User' object
  getUser(id: number): ApiResponse<User> {
    const user: User = { id, name: 'Alice', email: 'alice@test.com' };
    
    return {
      success: true,
      data: user, // Must match the <User> type!
      timestamp: new Date()
    };
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Type Narrowing */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Type Narrowing & Type Guards</h2>

          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">Checking the ID Card</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Sometimes a variable can be an "A" **OR** a "B". Before you can do something that only "A" is allowed to do, you must prove to TypeScript that the variable is an "A". This is called **Type Narrowing**.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs text-left">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full">
                <span className="font-bold text-slate-900 dark:text-white block mb-2 border-b border-slate-200 dark:border-slate-600 pb-2">
                  <code className="text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-1 rounded mr-1">typeof</code>
                  — For primitive values
                </span>
                <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">Use this when dealing with:</p>
                <ul className="space-y-1 text-slate-500 dark:text-slate-400 pl-4 list-disc marker:text-slate-400">
                  <li><code className="text-blue-600 dark:text-blue-400">string</code></li>
                  <li><code className="text-emerald-600 dark:text-emerald-400">number</code></li>
                  <li><code className="text-rose-600 dark:text-rose-400">boolean</code></li>
                  <li><code className="text-amber-600 dark:text-amber-500">undefined</code></li>
                </ul>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full">
                <span className="font-bold text-slate-900 dark:text-white block mb-2 border-b border-slate-200 dark:border-slate-600 pb-2">
                  <code className="text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-1 rounded mr-1">instanceof</code>
                  — For classes (real objects)
                </span>
                <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">Use this when working with:</p>
                <ul className="space-y-1 text-slate-500 dark:text-slate-400 pl-4 list-disc marker:text-slate-400">
                  <li>classes</li>
                  <li>objects created using <code className="text-pink-600 dark:text-pink-400">new</code></li>
                </ul>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full">
                <span className="font-bold text-slate-900 dark:text-white block mb-2 border-b border-slate-200 dark:border-slate-600 pb-2">
                  <code className="text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-1 rounded mr-1">in</code>
                  — For checking object properties
                </span>
                <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">Use this when:</p>
                <ul className="space-y-1 text-slate-500 dark:text-slate-400 pl-4 list-disc marker:text-slate-400">
                  <li>you don't know the exact type</li>
                  <li>but you want to check if a property exists</li>
                </ul>
              </div>
            </div>
            <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" /></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Simple Logic: Checking your ID</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  **Type Narrowing** is simply a way to check exactly what a value is. If a variable could be a **number** or a **string**, you use an "if" statement to find out. It's like a security guard asking for an ID—once you show you're a "number," TypeScript lets you into the "number room" where you're allowed to do math.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span> 
                  Plain TypeScript Example
                </h4>
                <p className="text-sm text-slate-500 mb-3"><code className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-slate-800 px-1 rounded">typeof</code> proves whether it's a string or number before you use it.</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// 1. typeof
function parseInput(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase();  // TypeScript knows it's a string here!
  }
}

// 2. instanceof
class CustomError { message = "Something broke!"; }

function handleError(error: unknown) {
  if (error instanceof CustomError) {
    console.log(error.message);  // TypeScript knows it's a CustomError class!
  }
}

// 3. in
type AdminUser = { role: "admin", privileges: string[] };

function getPrivileges(user: any) {
  if ("privileges" in user) {
    return user.privileges;  // TypeScript knows this object has a privileges array!
  }
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span> 
                  How it is used in NestJS
                </h4>
                <p className="text-sm text-slate-500 mb-3">In NestJS, you use Type Narrowing inside Exception Filters to see exactly what kind of error just crashed your app!</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    
    // Type Narrowing! Is the unknown error an instance of an HttpException?
    if (exception instanceof HttpException) {
      // Yes! We are safe to check its status code
      const status = exception.getStatus();
      response.status(status).json({ message: exception.message });
      
    } else {
      // No! It's some other random crash.
      response.status(500).json({ message: "Internal Server Error" });
    }
  }
}`}
                </pre>
              </div>
            </div>
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
