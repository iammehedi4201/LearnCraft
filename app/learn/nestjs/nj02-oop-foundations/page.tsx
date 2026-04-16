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

        {/* Section 1: Classes & Constructors */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Classes & Constructors</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">A class is a blueprint. The constructor runs when you create an instance. TypeScript adds access modifiers that JavaScript doesn't have.</p>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Basic class with constructor
class User {
  // Access modifiers:
  // public    — accessible everywhere (default)
  // private   — only inside this class
  // protected — this class + child classes
  // readonly  — can't be reassigned after construction

  public name: string;
  private email: string;
  protected role: string;
  readonly id: number;

  constructor(id: number, name: string, email: string, role: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  // Method
  getProfile(): string {
    return \`\${this.name} (\${this.email})\`;
  }
}

// ✅ TypeScript shorthand (NestJS uses this everywhere)
class Product {
  constructor(
    public readonly id: number,
    public name: string,
    public price: number,
    private stock: number,
  ) {}
  // ☝️ All properties declared and assigned in one line!
}

const product = new Product(1, "Laptop", 999, 50);
console.log(product.name);    // ✅ "Laptop"
// console.log(product.stock); // ❌ Error — private`}
            </pre>
          </div>
        </section>

        {/* Section 2: Encapsulation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Encapsulation — Hide the Internals</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Encapsulation means exposing only what's necessary and hiding internal implementation. This is exactly how NestJS Services work — controllers call service methods without knowing the implementation.</p>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`class BankAccount {
  private balance: number = 0;

  // ✅ Controlled access via methods
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
  }

  // ✅ Getter — read-only access
  getBalance(): number {
    return this.balance;
  }
}

// ✅ In NestJS, Services encapsulate business logic
// Controllers (public) → Services (private logic) → Repository (private DB)
// The controller never touches the database directly.`}
            </pre>
          </div>
        </section>

        {/* Section 3: Inheritance */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Inheritance — Share & Extend Behavior</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Base class (parent)
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

// ✅ Child class — inherits all properties and methods
class UserEntity extends BaseEntity {
  constructor(
    id: number,
    public name: string,
    public email: string,
  ) {
    super(id);  // Must call parent constructor
  }
}

// ✅ Another child
class ProductEntity extends BaseEntity {
  constructor(
    id: number,
    public title: string,
    public price: number,
  ) {
    super(id);
  }
}

const user = new UserEntity(1, "Mehedi", "m@e.com");
user.updateTimestamp();  // ✅ Inherited from BaseEntity
console.log(user.createdAt);  // ✅ Inherited property

// 🏗️ NestJS Example: Exception classes use inheritance
// HttpException → BadRequestException → extends HttpException
// HttpException → NotFoundException  → extends HttpException`}
            </pre>
          </div>
        </section>

        {/* Section 4: Polymorphism */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Polymorphism — Same Interface, Different Behavior</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Same method name, different implementations. This is how NestJS Guards and Pipes work — they all implement the same interface but behave differently.</p>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Interface defines the contract
interface NotificationService {
  send(to: string, message: string): void;
}

// ✅ Different implementations of the same interface
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

// ✅ Use without caring about implementation
function notify(service: NotificationService, to: string, msg: string) {
  service.send(to, msg);  // Works with ANY implementation
}

notify(new EmailNotification(), "user@mail.com", "Welcome!");
notify(new SmsNotification(), "+880...", "Your OTP is 1234");

// 🏗️ NestJS Example: Guards
// All guards implement CanActivate interface
// But AuthGuard, RolesGuard, ThrottlerGuard behave differently`}
            </pre>
          </div>
        </section>

        {/* Section 5: Abstraction */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Abstraction — Abstract Classes</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Abstract class — cannot be instantiated directly
abstract class BaseRepository<T> {
  // Concrete method — shared logic
  log(action: string): void {
    console.log(\`[\${new Date().toISOString()}] \${action}\`);
  }

  // Abstract methods — MUST be implemented by children
  abstract findAll(): Promise<T[]>;
  abstract findById(id: number): Promise<T | null>;
  abstract create(data: Partial<T>): Promise<T>;
  abstract delete(id: number): Promise<void>;
}

// ✅ Concrete implementation
class UserRepository extends BaseRepository<User> {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    this.log("Finding all users");
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

// const repo = new BaseRepository();  // ❌ Error — abstract
const repo = new UserRepository();     // ✅ Works`}
            </pre>
          </div>
        </section>

        {/* Express vs NestJS OOP Comparison */}
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
            </div>
          </div>
        </section>

        {/* Mini Challenge */}
        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <p className="text-amber-900 dark:text-amber-300 mb-4">Build a simple notification system using OOP:</p>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create an abstract <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">NotificationChannel</code> class with an abstract <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">send()</code> method</li>
            <li>Implement <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">EmailChannel</code>, <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">SmsChannel</code>, and <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">SlackChannel</code></li>
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">NotificationManager</code> class that accepts any channel via constructor injection</li>
            <li>This is the exact pattern NestJS uses for Dependency Injection!</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Making everything <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">public</code> — use <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">private</code> by default, only expose what's needed.</li>
            <li>Deep inheritance chains (more than 2-3 levels) — prefer <strong>composition over inheritance</strong>.</li>
            <li>Forgetting to call <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">super()</code> in child constructors.</li>
            <li>Not using interfaces — code to an interface, not an implementation.</li>
          </ul>
        </section>

        {/* Next Step */}
        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            OOP fundamentals are locked in. Move to <Link href="/learn/nestjs/nj03-decorators" className="font-bold underline hover:text-emerald-600">NJ-03 — Decorators Deep Dive</Link> to learn the "magic" behind NestJS's <code>@Controller</code>, <code>@Injectable</code>, <code>@Get</code>, and more.
          </p>
        </section>
      </div>
    </>
  );
}
