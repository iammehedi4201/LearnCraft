/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-04 — SOLID Principles
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * SOLID is a set of 5 design principles that make software more maintainable,
 * flexible, and scalable. NestJS architecture is built ON these principles.
 * Understanding SOLID is understanding WHY NestJS works the way it does.
 *
 * THE 5 PRINCIPLES
 * ────────────────
 * S — Single Responsibility Principle
 * O — Open/Closed Principle
 * L — Liskov Substitution Principle
 * I — Interface Segregation Principle
 * D — Dependency Inversion Principle
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ04SOLID(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                <span className="font-display font-bold text-sm tracking-wider">NJ-04</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">SOLID Principles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-amber-600" /></div>
                  <h4 className="font-display text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Core Concept</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">5 design principles that make software maintainable, flexible, and scalable. NestJS architecture is built ON these principles.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div>
                  <h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">Why NestJS Needs This</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS enforces SOLID by design: modules (S), providers (O, D), interfaces (L, I). Understanding SOLID = understanding NestJS architecture.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div>
                  <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express doesn't enforce any architecture. You CAN follow SOLID, but nothing forces you to. NestJS makes it the default.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div>
                  <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Learning Goal</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Understand each SOLID principle with practical examples, and see how NestJS embodies every single one.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
        </div>

        {/* S — Single Responsibility */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">S — Single Responsibility Principle</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 italic">"A class should have only one reason to change."</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">❌ Violating SRP</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// One class doing EVERYTHING
class UserService {
  createUser() { /* DB logic */ }
  sendEmail() { /* Email logic */ }
  generatePDF() { /* PDF logic */ }
  logActivity() { /* Logging logic */ }
}
// ⚠️ 4 reasons to change = 4 responsibilities
// Changing email breaks user creation tests`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">✅ Following SRP</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Each class has ONE responsibility
@Injectable()
class UserService {
  createUser() { /* Only user logic */ }
}

@Injectable()
class EmailService {
  sendEmail() { /* Only email logic */ }
}

@Injectable()
class PdfService {
  generatePDF() { /* Only PDF logic */ }
}
// ✅ Change email? Only EmailService changes.`}
              </pre>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-blue-800 dark:text-blue-300 text-sm"><strong>🏗️ NestJS enforces this:</strong> Controllers handle HTTP. Services handle business logic. Repositories handle data. Each has one job.</p>
          </div>
        </section>

        {/* O — Open/Closed */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">O — Open/Closed Principle</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 italic">"Open for extension, closed for modification."</p>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Open/Closed with Strategy Pattern

// Define the contract
interface PaymentStrategy {
  pay(amount: number): Promise<boolean>;
}

// Add new payment methods WITHOUT modifying existing code
class StripePayment implements PaymentStrategy {
  async pay(amount: number): Promise<boolean> {
    console.log(\`Charging $\${amount} via Stripe\`);
    return true;
  }
}

class PayPalPayment implements PaymentStrategy {
  async pay(amount: number): Promise<boolean> {
    console.log(\`Charging $\${amount} via PayPal\`);
    return true;
  }
}

// ✅ NEW: Add BKash without changing anything above
class BKashPayment implements PaymentStrategy {
  async pay(amount: number): Promise<boolean> {
    console.log(\`Charging ৳\${amount} via BKash\`);
    return true;
  }
}

// Service is closed for modification — just inject any strategy
@Injectable()
class PaymentService {
  constructor(private strategy: PaymentStrategy) {}

  async processPayment(amount: number) {
    return this.strategy.pay(amount);
  }
}

// 🏗️ NestJS Pattern: Guards, Pipes, Interceptors all follow OCP
// Want new auth logic? Create a new Guard. Don't modify existing ones.`}
            </pre>
          </div>
        </section>

        {/* L — Liskov Substitution */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">L — Liskov Substitution Principle</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 italic">"Subtypes must be substitutable for their base types."</p>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Any child class should work wherever the parent is expected

abstract class BaseRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: number): Promise<T | null>;
  abstract create(data: Partial<T>): Promise<T>;
}

class PostgresUserRepo extends BaseRepository<User> {
  async findAll() { /* Postgres query */ return []; }
  async findById(id: number) { /* Postgres query */ return null; }
  async create(data: Partial<User>) { /* Postgres insert */ return data as User; }
}

class MongoUserRepo extends BaseRepository<User> {
  async findAll() { /* Mongo query */ return []; }
  async findById(id: number) { /* Mongo query */ return null; }
  async create(data: Partial<User>) { /* Mongo insert */ return data as User; }
}

// ✅ Service doesn't care which database is behind it
@Injectable()
class UserService {
  constructor(private repo: BaseRepository<User>) {}

  findAll() {
    return this.repo.findAll();  // Works with Postgres OR Mongo!
  }
}

// 🏗️ NestJS uses this in its Transport layer:
// TCP, Redis, NATS, RabbitMQ — all interchangeable transports`}
            </pre>
          </div>
        </section>

        {/* I — Interface Segregation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">I — Interface Segregation Principle</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 italic">"Don't force clients to depend on interfaces they don't use."</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">❌ Fat Interface</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
  code(): void;
  manage(): void;
}

// ⚠️ A Robot worker doesn't eat or sleep!
class RobotWorker implements Worker {
  work() { /* ✅ */ }
  eat() { /* ??? Not applicable */ }
  sleep() { /* ??? Not applicable */ }
  code() { /* ✅ */ }
  manage() { /* ??? Not applicable */ }
}`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">✅ Segregated Interfaces</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`interface Workable {
  work(): void;
}

interface Feedable {
  eat(): void;
}

interface Codeable {
  code(): void;
}

// ✅ Only implement what you need
class RobotWorker implements Workable, Codeable {
  work() { /* ✅ */ }
  code() { /* ✅ */ }
}

class HumanWorker implements Workable, Feedable, Codeable {
  work() { /* ✅ */ }
  eat()  { /* ✅ */ }
  code() { /* ✅ */ }
}`}
              </pre>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-blue-800 dark:text-blue-300 text-sm"><strong>🏗️ NestJS Example:</strong> <code>CanActivate</code> (Guards), <code>NestInterceptor</code> (Interceptors), <code>PipeTransform</code> (Pipes) — each is a small, focused interface. You only implement what you need.</p>
          </div>
        </section>

        {/* D — Dependency Inversion */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">D — Dependency Inversion Principle</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 italic">"Depend on abstractions, not on concretions."</p>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">This is the MOST important principle for NestJS. The entire Dependency Injection system is built on DIP.</p>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ❌ WITHOUT DIP — tightly coupled
class OrderService {
  private emailService = new EmailService();  // Hardcoded dependency!
  
  createOrder() {
    // Can't swap EmailService for SmsService without modifying this class
    this.emailService.send("Order created");
  }
}

// ✅ WITH DIP — depend on abstraction
interface NotificationService {
  send(message: string): void;
}

@Injectable()
class OrderService {
  // Inject the abstraction, not the implementation
  constructor(private notifier: NotificationService) {}

  createOrder() {
    this.notifier.send("Order created");
    // Works with EmailService, SmsService, SlackService...
  }
}

// 🏗️ NestJS makes this easy with its DI container:
// In the module, you decide WHICH implementation to inject:
@Module({
  providers: [
    OrderService,
    { provide: 'NotificationService', useClass: EmailService },
    // Switch to SMS? Just change useClass: SmsService
  ],
})
export class OrderModule {}`}
            </pre>
          </div>
        </section>

        {/* Summary Table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Summary — SOLID in NestJS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Principle</th>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">NestJS Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium text-slate-900 dark:text-white">S — Single Responsibility</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Controllers, Services, Repositories — each has one job</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium text-slate-900 dark:text-white">O — Open/Closed</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Guards, Pipes, Interceptors — extend without modifying</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium text-slate-900 dark:text-white">L — Liskov Substitution</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Transport layers, database drivers — swap interchangeably</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium text-slate-900 dark:text-white">I — Interface Segregation</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">CanActivate, PipeTransform, NestInterceptor — small focused interfaces</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium text-slate-900 dark:text-white">D — Dependency Inversion</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">DI Container — inject abstractions, swap implementations</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Mini Challenge */}
        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <p className="text-amber-900 dark:text-amber-300 mb-4">Refactor this code to follow ALL SOLID principles:</p>
          <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm mb-4">
            {`// ❌ This class violates all 5 principles. Fix it!
class AppService {
  private db = new MySQLDatabase();
  
  getUsers() { return this.db.query("SELECT * FROM users"); }
  sendEmail(to: string, msg: string) { /* email logic */ }
  generateReport() { /* PDF logic */ }
  validateInput(data: any) { /* validation logic */ }
  logError(err: Error) { /* logging logic */ }
}`}
          </pre>
          <p className="text-amber-800 dark:text-amber-300 text-sm">Hint: Split into multiple classes, create interfaces, and use constructor injection.</p>
        </section>

        {/* Common Mistakes */}
        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Over-engineering with too many abstractions when the project is small — apply SOLID gradually.</li>
            <li>Using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">new</code> inside classes instead of constructor injection — this breaks DIP and makes testing hard.</li>
            <li>Creating "God classes" that do everything — always ask "does this class have more than one reason to change?"</li>
            <li>Ignoring ISP by creating giant interfaces — keep interfaces small and focused.</li>
          </ul>
        </section>

        {/* Next Step */}
        <section className="mt-6 p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-green-900 dark:text-green-400">🎉 Prerequisites Complete!</h3>
          <p className="text-green-900 dark:text-green-300">
            You now have the TypeScript, OOP, Decorator, and SOLID foundations that NestJS demands.
            Time to dive into the framework itself! Move to <Link href="/learn/nestjs/nj05-setup" className="font-bold underline hover:text-green-600">NJ-05 — Project Setup & Architecture</Link> to create your first NestJS application.
          </p>
        </section>
      </div>
    </>
  );
}
