/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-02 — OOP Foundations
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * Object-Oriented Programming (OOP) organizes code into classes — blueprints
 * for creating objects with properties (data) and methods (behavior).
 * NestJS is an OOP-first framework. Every building block is a class.
 *
 * THE 4 PILLARS OF OOP
 * ────────────────────
 * 1. Encapsulation — hide internal state, expose through methods
 * 2. Inheritance — share behavior between parent and child classes
 * 3. Polymorphism — same interface, different implementations
 * 4. Abstraction — hide complexity, show only what's needed
 *
 * EXPRESS.JS COMPARISON
 * ─────────────────────
 * Express uses functions and middleware (procedural/functional). NestJS uses
 * classes, decorators, and dependency injection (OOP). Understanding OOP is
 * the bridge from Express to NestJS.
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

export default function NJ02OOP(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                <span className="font-display font-bold text-sm tracking-wider">NJ-02</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                OOP Foundations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-amber-600" /></div>
                  <h4 className="font-display text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Core Concept</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">OOP organizes code into classes — blueprints for objects with properties (data) and methods (behavior). NestJS is OOP-first: every building block is a class.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div>
                  <h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">Why NestJS Needs This</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Controllers are classes. Services are classes. Guards, pipes, interceptors — all classes. OOP mastery = NestJS mastery.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div>
                  <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express uses functions and middleware (procedural). NestJS uses classes and dependency injection. OOP is the bridge between the two.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div>
                  <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Learning Goal</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Master classes, inheritance, encapsulation, polymorphism, abstraction, and how NestJS leverages every one of them.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 1: Classes & Objects                                       */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Classes &amp; Objects</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">

            {/* NEW: What is a Class? intro */}
            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is a Class?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                In regular JavaScript (and Express), you organize code using <strong>functions</strong> — standalone blocks of logic. In OOP, you organize code using <strong>classes</strong>. A class bundles <em>data</em> (properties) and <em>actions</em> (methods) together into one neat package. Instead of having a random <code className="text-sky-600">getUserName()</code> function floating around, you put it <em>inside</em> a <code className="text-sky-600">User</code> class where it belongs.
              </p>
            </div>

            {/* Lego Metaphor */}
            <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">The &quot;Lego&quot; Metaphor: Instructions vs. The Build</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Think of a <strong>Class</strong> as the Lego instruction booklet. It tells you exactly how to build a castle, but it&apos;s not the castle itself. An <strong>Object</strong> (or instance) is the actual Lego castle you built using those instructions. You can use one booklet to build 100 identical castles!
                </p>
              </div>
            </div>

            {/* Access modifier explainer cards */}
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">The 4 Access Modifiers — Who Can See What?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                <h5 className="text-xs font-bold text-emerald-600 uppercase mb-1">public (default)</h5>
                <p className="text-[11px] text-slate-500">Anyone can read and change it. Like a public park — everyone has access.</p>
              </div>
              <div className="p-4 bg-red-500/5 rounded-xl border border-red-100 dark:border-red-900/30">
                <h5 className="text-xs font-bold text-red-600 uppercase mb-1">private</h5>
                <p className="text-[11px] text-slate-500">Only code <strong>inside</strong> this class can see it. Like your diary — only you can read it.</p>
              </div>
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <h5 className="text-xs font-bold text-blue-600 uppercase mb-1">protected</h5>
                <p className="text-[11px] text-slate-500">This class <strong>and child classes</strong> can see it. Like a family recipe — shared only within the family.</p>
              </div>
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-100 dark:border-amber-900/30">
                <h5 className="text-xs font-bold text-amber-600 uppercase mb-1">readonly</h5>
                <p className="text-[11px] text-slate-500">Can be set once (in the constructor), then <strong>never changed</strong>. Like your birthday — it&apos;s fixed forever.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                  Plain TypeScript — The Long Way
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// A basic class with a constructor
class User {
  public name: string;       // Anyone can access
  private email: string;     // Only this class can access  
  protected role: string;    // This class + children can access
  readonly id: number;       // Set once, never changed

  constructor(id: number, name: string, email: string, role: string) {
    this.id = id;            // Assign each property manually
    this.name = name;
    this.email = email;
    this.role = role;
  }

  // Method — a function that belongs to this class
  getProfile(): string {
    return \`\${this.name} (\${this.email})\`;
  }
}

// Create an object (instance) from the class
const user = new User(1, "Mehedi", "m@test.com", "admin");
console.log(user.name);       // ✅ "Mehedi" — public
// console.log(user.email);   // ❌ Error — private!
// user.id = 999;             // ❌ Error — readonly!`}
                </pre>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                  TypeScript Shorthand — What NestJS Actually Uses
                </h4>
                <p className="text-sm text-slate-500 mb-3">TypeScript has a shorthand that declares AND assigns properties in the constructor. NestJS uses this <strong>everywhere</strong>.</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// ✅ Shorthand — declare + assign in one line!
class Product {
  constructor(
    public readonly id: number,   // same as: this.id = id
    public name: string,          // same as: this.name = name
    public price: number,         // same as: this.price = price
    private stock: number,        // same as: this.stock = stock (private!)
  ) {}
  // ☝️ The body is empty! TypeScript handles everything.
}

const product = new Product(1, "Laptop", 999, 50);
console.log(product.name);    // ✅ "Laptop"
// console.log(product.stock); // ❌ Error — private`}
                </pre>
              </div>

              {/* NEW: Side-by-side comparison */}
              <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                  <span className="text-base">💡</span>
                  Why the shorthand matters
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  The &quot;long way&quot; requires you to: (1) declare the property, (2) list it as a parameter, (3) assign it in the body. That&apos;s <strong>3 lines per property</strong>. The shorthand does all 3 in <strong>1 line</strong>. A NestJS service with 5 injected dependencies would need 15 lines the long way vs. 5 lines with the shorthand.
                </p>
              </div>
            </div>

            <QuickCheck
              question={`What's the difference between "private" and "readonly"?`}
              answer={`"private" controls WHO can access the property — only code inside the class. "readonly" controls WHETHER it can be changed — it can be set once in the constructor but never reassigned. They solve different problems and can even be combined: "private readonly secret: string" means only the class can see it, AND it can never change.`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 2: Encapsulation                                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Encapsulation — Hiding the Mess</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">

            {/* NEW: What is this? intro */}
            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is Encapsulation?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Encapsulation means <strong>hiding internal details and controlling access through methods</strong>. Instead of letting anyone directly change a value (which could break things), you force them to go through a &quot;gatekeeper&quot; method that validates the change first.
              </p>
            </div>

            {/* Car Hood Metaphor */}
            <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">The &quot;Car Hood&quot; Metaphor: Don&apos;t touch the engine!</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  When you drive a car, you use the steering wheel and pedals. You don&apos;t need to touch the hot, messy engine to turn left. <strong>Encapsulation</strong> means we hide the &quot;messy&quot; inner parts of our code (using <code className="text-blue-600">private</code>) and only show the &quot;clean&quot; controls (using <code className="text-blue-600">public</code> methods).
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* NEW: What goes wrong WITHOUT encapsulation */}
              <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
                <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                  <span className="text-base">💥</span>
                  Without Encapsulation — What Goes Wrong
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// ❌ No encapsulation — anyone can mess with the balance directly
class UnsafeBankAccount {
  public balance: number = 0;  // Anyone can change this!
}

const account = new UnsafeBankAccount();
account.balance = 1000000;   // 💰 Just gave myself a million dollars!
account.balance = -500;      // 💥 Negative balance? No rules!
// No validation, no logging, no protection.`}
                </pre>
              </div>

              {/* With Encapsulation */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-emerald-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">✓</span>
                  With Encapsulation — The Safe Way
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`class BankAccount {
  private balance: number = 0;  // 🔒 Hidden! Nobody can touch this directly.

  // ✅ Controlled access — deposit MUST go through this method
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
    console.log(\`Deposited \${amount}. New balance: \${this.balance}\`);
  }

  // ✅ Controlled access — withdrawal has rules
  withdraw(amount: number): void {
    if (amount > this.balance) throw new Error("Insufficient funds!");
    this.balance -= amount;
  }

  // ✅ Getter — read-only access to the balance
  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();
account.deposit(500);           // ✅ Goes through validation
// account.balance = 1000000;   // ❌ Error — private!
console.log(account.getBalance()); // ✅ Read-only access`}
                </pre>
              </div>

              {/* How NestJS uses this */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">N</span>
                  How NestJS Uses Encapsulation
                </h4>
                <p className="text-sm text-slate-500 mb-3">NestJS enforces encapsulation through a layered architecture. Each layer hides its details from the one above.</p>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold px-2 py-1 rounded text-[10px] w-24 text-center shrink-0">Controller</span>
                      <span>→ Public. Handles HTTP requests from users.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold px-2 py-1 rounded text-[10px] w-24 text-center shrink-0">Service</span>
                      <span>→ Private logic. Contains business rules. Controllers call services.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-bold px-2 py-1 rounded text-[10px] w-24 text-center shrink-0">Repository</span>
                      <span>→ Private DB access. Only services can talk to the database.</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-3 italic">The controller never touches the database directly — that&apos;s encapsulation in action!</p>
                </div>
              </div>
            </div>

            <QuickCheck
              question={`Why is it bad to make a "balance" property public on a BankAccount class?`}
              answer={`Because anyone could set the balance to any value — negative numbers, impossibly large amounts, or zero — without any validation. By making it private and forcing access through deposit()/withdraw() methods, you guarantee that every change follows your business rules (e.g., "you can't withdraw more than you have").`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 3: Inheritance                                             */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Inheritance — Family Traits</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">

            {/* What is this? intro */}
            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is Inheritance?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Inheritance lets a child class <strong>reuse all the code</strong> from a parent class, then add its own unique features on top. This prevents you from copy-pasting the same code into every class. You write the shared logic <em>once</em> in the parent, and every child gets it automatically.
              </p>
            </div>

            {/* Family Metaphor */}
            <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">The &quot;Family&quot; Metaphor: Passing down traits</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>Inheritance</strong> is like passing down your last name or eye color to your children. In code, a &quot;Parent&quot; class can pass all its skills and data down to a &quot;Child&quot; class (using <code className="text-emerald-600">extends</code>). This saves you from writing the same code over and over again for different items that are basically the same.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* NEW: Without inheritance pain point */}
              <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
                <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                  <span className="text-base">😫</span>
                  Without Inheritance — Copy-Paste Nightmare
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// ❌ Without inheritance — you repeat the SAME code in every class
class UserEntity {
  id: number;
  createdAt: Date = new Date();    // ← repeated
  updatedAt: Date = new Date();    // ← repeated
  name: string;
  email: string;
}

class ProductEntity {
  id: number;
  createdAt: Date = new Date();    // ← same thing again!
  updatedAt: Date = new Date();    // ← same thing again!
  title: string;
  price: number;
}

class OrderEntity {
  id: number;
  createdAt: Date = new Date();    // ← and again! 😩
  updatedAt: Date = new Date();
  total: number;
}
// id, createdAt, updatedAt are duplicated 3 times!`}
                </pre>
              </div>

              {/* With inheritance */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-emerald-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">✓</span>
                  With Inheritance — Write Once, Reuse Everywhere
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// ✅ Step 1: Write shared logic ONCE in a parent class
class BaseEntity {
  constructor(
    public id: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  updateTimestamp(): void {
    this.updatedAt = new Date();
  }
}

// ✅ Step 2: Children "extend" the parent — they get EVERYTHING for free
class UserEntity extends BaseEntity {
  constructor(
    id: number,                    // passed up to parent
    public name: string,           // unique to UserEntity
    public email: string,          // unique to UserEntity
  ) {
    super(id);  // ← MUST call parent constructor first!
  }
}

class ProductEntity extends BaseEntity {
  constructor(
    id: number,
    public title: string,
    public price: number,
  ) {
    super(id);  // ← same pattern
  }
}

// ✅ Step 3: Use inherited properties and methods
const user = new UserEntity(1, "Mehedi", "m@e.com");
user.updateTimestamp();        // ✅ Inherited method!
console.log(user.createdAt);  // ✅ Inherited property!
console.log(user.name);       // ✅ Own property`}
                </pre>
              </div>

              {/* NestJS real-world usage */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">N</span>
                  How NestJS Uses Inheritance
                </h4>
                <p className="text-sm text-slate-500 mb-3">NestJS&apos;s own exception classes are a perfect real-world family tree:</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// NestJS built-in exception hierarchy:
//
//   HttpException (parent)
//     ├── BadRequestException     (400)  ← extends HttpException
//     ├── UnauthorizedException   (401)  ← extends HttpException
//     ├── NotFoundException       (404)  ← extends HttpException
//     └── InternalServerException (500)  ← extends HttpException
//
// They ALL inherit .getStatus() and .getResponse() from HttpException!

throw new NotFoundException('User not found');
// Automatically gets: status=404, message="User not found"`}
                </pre>
              </div>

              {/* super() explainer */}
              <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3">What does <code>super()</code> do?</h4>
                <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-decimal pl-5">
                  <li><code className="text-amber-600 font-bold">super()</code> calls the <strong>parent class&apos;s constructor</strong>. If the parent needs an <code>id</code>, you must pass it up.</li>
                  <li>You <strong>must</strong> call <code>super()</code> before using <code>this</code> in the child constructor. TypeScript will give you an error if you forget.</li>
                  <li>Think of it as telling the parent: &quot;Hey, set up your part first, then I&apos;ll add my own stuff.&quot;</li>
                </ol>
              </div>
            </div>

            <QuickCheck
              question={`You create a child class "AdminUser extends User" but forget to call super(). What happens?`}
              answer={`TypeScript will show a compile-time error: "Constructors for derived classes must contain a 'super' call." The parent's constructor never runs, so its properties (like id, createdAt) would never be initialized. Always call super() first in a child constructor!`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 4: Polymorphism                                            */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Polymorphism — The Universal Remote</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">

            {/* What is this? */}
            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is Polymorphism?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Polymorphism means <strong>&quot;many forms.&quot;</strong> It lets you call the <em>same method name</em> on different objects, and each object responds in its own way. You write your code against a <strong>shared interface</strong>, and the specific object decides what actually happens.
              </p>
            </div>

            {/* Remote Metaphor */}
            <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">The &quot;Remote&quot; Metaphor: One button, many results</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Think of a &quot;Power&quot; button on a universal remote. When you press it, the TV turns on, the Stereo turns on, and the Lights dim. They all responded to the <em>same</em> button, but they each did their own thing. In code, <strong>Polymorphism</strong> lets you call the same method name (like <code className="text-purple-600">.send()</code>) on different objects, and each one knows how to handle it.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Step-by-step example */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                  Step-by-Step: Building a Notification System
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// Step 1: Define the CONTRACT (interface)
// "Any notification service MUST have a send() method"
interface NotificationService {
  send(to: string, message: string): void;
}

// Step 2: Create DIFFERENT implementations of the same contract
class EmailNotification implements NotificationService {
  send(to: string, message: string): void {
    console.log(\`📧 Email to \${to}: \${message}\`);
  }
}

class SmsNotification implements NotificationService {
  send(to: string, message: string): void {
    console.log(\`📱 SMS to \${to}: \${message}\`);
  }
}

class PushNotification implements NotificationService {
  send(to: string, message: string): void {
    console.log(\`🔔 Push to \${to}: \${message}\`);
  }
}

// Step 3: Write code that works with ANY notification service!
function notify(service: NotificationService, to: string, msg: string) {
  service.send(to, msg);  // Same method call — different behavior!
}

// Step 4: Swap implementations without changing the function
notify(new EmailNotification(), "user@mail.com", "Welcome!");
notify(new SmsNotification(), "+880...", "Your OTP is 1234");
notify(new PushNotification(), "user123", "New message!");`}
                </pre>
              </div>

              {/* Why polymorphism matters */}
              <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                  <span className="text-base">💡</span>
                  Why this is powerful
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  The <code className="text-emerald-600">notify()</code> function doesn&apos;t know or care if it&apos;s sending an email, SMS, or push notification. You can add a <code className="text-emerald-600">WhatsAppNotification</code> class next week and <strong>the function doesn&apos;t change at all</strong>. This is the real power of polymorphism — your code is <strong>open for extension but closed for modification</strong>.
                </p>
              </div>

              {/* NestJS usage */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">N</span>
                  How NestJS Uses Polymorphism
                </h4>
                <p className="text-sm text-slate-500 mb-3">All NestJS Guards implement the same <code className="text-blue-600">CanActivate</code> interface, but each behaves differently:</p>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// NestJS Guards — same interface, different implementations
// All implement: canActivate(context): boolean

// AuthGuard     → checks if user is logged in
// RolesGuard    → checks if user has the right role  
// ThrottlerGuard → checks if user is sending too many requests

// NestJS doesn't care WHICH guard you use — it just calls:
//   guard.canActivate(context)  ← polymorphism!

@Injectable()
class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest().user;
    return user.role === 'admin';
  }
}`}
                </pre>
              </div>
            </div>

            <QuickCheck
              question={`You have 3 payment classes: CreditCard, PayPal, and BankTransfer. They all have a "pay(amount)" method. What OOP concept is this?`}
              answer={`This is Polymorphism! All 3 classes implement the same method "pay(amount)" but each processes the payment differently internally. You could write a function "processOrder(paymentMethod: PaymentService, amount: number)" that works with ANY payment method without knowing the specific implementation.`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 5: Abstraction                                             */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Abstraction — The Light Switch</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">

            {/* What is this? */}
            <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
              <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is Abstraction?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Abstraction means defining <strong>what something should do</strong> without specifying <strong>how it does it</strong>. An abstract class is like a contract: it lists the methods that must exist, but leaves the implementation details to the child classes. You <strong>cannot create an instance</strong> of an abstract class directly.
              </p>
            </div>

            {/* Abstraction vs Interface clarification */}
            <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8">
              <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3">Abstract Class vs Interface — What&apos;s the Difference?</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="py-2 px-3 text-left font-bold text-slate-500">Feature</th>
                      <th className="py-2 px-3 text-center font-bold text-blue-600">Interface</th>
                      <th className="py-2 px-3 text-center font-bold text-purple-600">Abstract Class</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 dark:text-slate-400">
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-2 px-3">Can have real code?</td>
                      <td className="py-2 px-3 text-center text-red-500">❌ No, just shapes</td>
                      <td className="py-2 px-3 text-center text-emerald-600">✅ Yes, shared methods</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-2 px-3">Can create instances?</td>
                      <td className="py-2 px-3 text-center text-red-500">❌ No</td>
                      <td className="py-2 px-3 text-center text-red-500">❌ No</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-2 px-3">Multiple inheritance?</td>
                      <td className="py-2 px-3 text-center text-emerald-600">✅ Can implement many</td>
                      <td className="py-2 px-3 text-center text-red-500">❌ Can extend only one</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Best for</td>
                      <td className="py-2 px-3 text-center">Contracts / shapes</td>
                      <td className="py-2 px-3 text-center">Shared logic + contracts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Light Switch Metaphor */}
            <div className="p-6 bg-rose-500/5 rounded-2xl border border-rose-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-rose-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">The &quot;Light Switch&quot; Metaphor: Usage vs. Complexity</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  When you want to turn on the light, you flip a switch. You don&apos;t need to know about the wires, the power plant, or the physics of electricity. <strong>Abstraction</strong> means hiding the massive complexity behind a simple &quot;Interface.&quot; In NestJS, we use <strong>Abstract Classes</strong> to define what something <em>should</em> do, without worrying yet about <em>how</em> it does it.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                  Step-by-Step: Abstract Repository Pattern
                </h4>
                <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
                  {`// Step 1: Define the abstract class — the "contract"
// This says WHAT a repository must do, not HOW
abstract class BaseRepository<T> {
  // ✅ Concrete method — shared logic (children inherit this for free)
  log(action: string): void {
    console.log(\`[\${new Date().toISOString()}] \${action}\`);
  }

  // ✅ Abstract methods — children MUST implement these
  abstract findAll(): Promise<T[]>;
  abstract findById(id: number): Promise<T | null>;
  abstract create(data: Partial<T>): Promise<T>;
  abstract delete(id: number): Promise<void>;
}

// Step 2: Create a concrete implementation
class UserRepository extends BaseRepository<User> {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    this.log("Finding all users");  // ← uses inherited log()
    return this.users;
  }

  async findById(id: number): Promise<User | null> {
    this.log(\`Finding user \${id}\`);
    return this.users.find(u => u.id === id) || null;
  }

  async create(data: Partial<User>): Promise<User> {
    this.log("Creating user");
    const user = { id: Date.now(), ...data } as User;
    this.users.push(user);
    return user;
  }

  async delete(id: number): Promise<void> {
    this.log(\`Deleting user \${id}\`);
    this.users = this.users.filter(u => u.id !== id);
  }
}

// Step 3: Use it!
// const repo = new BaseRepository();  // ❌ Error — abstract classes can't be instantiated!
const repo = new UserRepository();     // ✅ Works — it's a concrete implementation`}
                </pre>
              </div>

              {/* Why abstract? */}
              <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                  <span className="text-base">💡</span>
                  Why not just use a regular class?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  An abstract class <strong>forces</strong> every child to implement the required methods. If you forget <code className="text-emerald-600">findAll()</code> in your <code className="text-emerald-600">ProductRepository</code>, TypeScript will show a compile-time error. A regular class can&apos;t enforce this — you&apos;d only discover the missing method when your app crashes at runtime.
                </p>
              </div>
            </div>

            <QuickCheck
              question={`Can you create an instance of an abstract class? e.g., "const repo = new BaseRepository()"`}
              answer={`No! Abstract classes cannot be instantiated directly — you'll get a TypeScript error. They exist only as blueprints for child classes. You must create a concrete child class (like UserRepository) that implements all the abstract methods, then instantiate that child class instead.`}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Section 6: Express vs NestJS Comparison                            */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">6. Express vs NestJS — Paradigm Shift</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express (Procedural)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Functions + middleware chains
const express = require("express");
const app = express();

// Route handler — plain function
app.get("/users", (req, res) => {
  const users = getUsersFromDB();
  res.json(users);
});

// Middleware — plain function
function authMiddleware(req, res, next) {
  if (!req.headers.token) {
    return res.status(401).send();
  }
  next();
}

app.use(authMiddleware);`}
              </pre>
              <p className="text-xs text-red-600 dark:text-red-400 mt-3 italic">
                ⚠️ Logic is scattered across standalone functions. No structure enforced — you organize it yourself (or don&apos;t).
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS (OOP)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Classes + decorators + DI
@Controller('users')
class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

// Guard — a class implementing interface
@Injectable()
class AuthGuard implements CanActivate {
  canActivate(context) {
    return !!context.getRequest().token;
  }
}`}
              </pre>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 italic">
                ✅ Clear structure. Controller handles routes, Service handles logic, Guard handles auth. Each is a class with a single responsibility.
              </p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Mini Challenge                                                     */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <p className="text-amber-900 dark:text-amber-300 mb-4">Build a simple notification system using OOP:</p>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create an abstract <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">NotificationChannel</code> class with an abstract <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">send()</code> method and a concrete <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">log()</code> method</li>
            <li>Implement <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">EmailChannel</code>, <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">SmsChannel</code>, and <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">SlackChannel</code></li>
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">NotificationManager</code> class that accepts any channel via constructor injection</li>
            <li>This is the exact pattern NestJS uses for Dependency Injection!</li>
          </ul>

          <Collapsible title="💡 Show Solution (try it yourself first!)">
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// 1. Abstract class — the contract
abstract class NotificationChannel {
  // Concrete method — shared by all channels
  log(message: string): void {
    console.log(\`[\${new Date().toISOString()}] \${message}\`);
  }

  // Abstract method — each channel implements differently
  abstract send(to: string, message: string): void;
}

// 2. Concrete implementations
class EmailChannel extends NotificationChannel {
  send(to: string, message: string): void {
    this.log(\`📧 Sending email to \${to}\`);
    console.log(\`Email body: \${message}\`);
  }
}

class SmsChannel extends NotificationChannel {
  send(to: string, message: string): void {
    this.log(\`📱 Sending SMS to \${to}\`);
    console.log(\`SMS: \${message}\`);
  }
}

class SlackChannel extends NotificationChannel {
  send(to: string, message: string): void {
    this.log(\`💬 Sending Slack message to \${to}\`);
    console.log(\`Slack: \${message}\`);
  }
}

// 3. NotificationManager — uses constructor injection (like NestJS!)
class NotificationManager {
  constructor(private channel: NotificationChannel) {}
  //          ☝️ Accepts ANY channel — polymorphism!

  notify(to: string, message: string): void {
    this.channel.send(to, message);
  }
}

// 4. Usage — swap channels freely!
const emailManager = new NotificationManager(new EmailChannel());
emailManager.notify("user@test.com", "Welcome!");

const smsManager = new NotificationManager(new SmsChannel());
smsManager.notify("+880123456", "Your OTP is 9999");`}
            </pre>
          </Collapsible>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Common Mistakes                                                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Making everything <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">public</code> — use <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">private</code> by default, only expose what&apos;s needed.</li>
            <li>Deep inheritance chains (more than 2-3 levels) — prefer <strong>composition over inheritance</strong>.</li>
            <li>Forgetting to call <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">super()</code> in child constructors — TypeScript will catch this, but understand <em>why</em> it&apos;s needed.</li>
            <li>Not using interfaces — code to an interface, not an implementation. This makes your code swappable and testable.</li>
            <li>Confusing Abstraction and Encapsulation — Encapsulation = <strong>hiding data</strong> (private). Abstraction = <strong>hiding complexity</strong> (abstract classes/interfaces).</li>
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
              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded shrink-0">1</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Classes &amp; Objects</strong> — A class is a blueprint, an object is the instance built from it. NestJS uses the constructor shorthand everywhere.</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded shrink-0">2</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Encapsulation</strong> — Hide internal state with <code className="text-blue-600">private</code>, expose controlled access through methods.</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded shrink-0">3</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Inheritance</strong> — Share common code through parent classes using <code className="text-emerald-600">extends</code> and <code className="text-emerald-600">super()</code>.</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold px-2 py-1 rounded shrink-0">4</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Polymorphism</strong> — Same interface, different implementations. NestJS Guards, Pipes, and Interceptors all use this.</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-xs font-bold px-2 py-1 rounded shrink-0">5</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">Abstraction</strong> — Define contracts with abstract classes. Children must implement all abstract methods.</p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 text-xs font-bold px-2 py-1 rounded shrink-0">!</span>
              <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-900 dark:text-white">NestJS = OOP</strong> — Every NestJS building block (Controller, Service, Guard, Pipe) is a class that uses these 4 pillars.</p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* Next Step                                                          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            OOP fundamentals are locked in. Move to <Link href="/learn/nestjs/nj03-decorators" className="font-bold underline hover:text-emerald-600">NJ-03 — Decorators Deep Dive</Link> to learn the &quot;magic&quot; behind NestJS&apos;s <code>@Controller</code>, <code>@Injectable</code>, <code>@Get</code>, and more.
          </p>
        </section>
      </div>
    </>
  );
}
