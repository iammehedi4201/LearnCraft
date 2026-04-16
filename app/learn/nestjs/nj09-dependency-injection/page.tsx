/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-09 — Dependency Injection
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ09DI(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
                <span className="font-display font-bold text-sm tracking-wider">NJ-09</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Dependency Injection</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div><h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">NestJS Concept</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">DI is a design pattern where a class receives its dependencies from an external source rather than creating them itself. NestJS has a built-in IoC container.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express has no DI system. You manually import and instantiate everything. NestJS automates the entire lifecycle.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. How DI Works in NestJS</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// Step 1: Mark a class as injectable
@Injectable()
export class CatsService {
  findAll() { return ['Tom', 'Garfield']; }
}

// Step 2: Register it in a module's providers
@Module({
  providers: [CatsService],  // NestJS now "knows" about CatsService
  controllers: [CatsController],
})
export class CatsModule {}

// Step 3: Inject via constructor (NestJS does the rest)
@Controller('cats')
export class CatsController {
  // ✅ NestJS automatically:
  // 1. Sees CatsService in the constructor
  // 2. Looks it up in the IoC container
  // 3. Creates an instance (or returns existing singleton)
  // 4. Injects it here
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
}

// ❌ WITHOUT DI (what you'd do in Express):
// const catsService = new CatsService();
// const anotherService = new AnotherService(catsService);
// const yetAnother = new YetAnother(anotherService, catsService);
// Managing all this manually = nightmare at scale`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Token-Based Injection</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Inject, Injectable } from '@nestjs/common';

// ✅ When the provider isn't a class, use @Inject() with a token
@Module({
  providers: [
    {
      provide: 'CONFIG',             // Token (string)
      useValue: {
        dbHost: 'localhost',
        dbPort: 5432,
        jwtSecret: 'super-secret',
      },
    },
    {
      provide: 'LOGGER',             // Another token
      useFactory: () => {
        return new WinstonLogger({ level: 'debug' });
      },
    },
  ],
})
export class AppModule {}

// Inject using the token
@Injectable()
export class AppService {
  constructor(
    @Inject('CONFIG') private config: any,
    @Inject('LOGGER') private logger: any,
  ) {}

  getDbHost() {
    this.logger.log('Accessing DB config');
    return this.config.dbHost;
  }
}

// 🔑 Best Practice: Use constants for tokens
// constants.ts
export const CONFIG_TOKEN = 'CONFIG';
export const LOGGER_TOKEN = 'LOGGER';`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Interface-Based Injection (DIP in Action)</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Depend on abstractions, not concretions (SOLID - D)

// 1. Define the interface
interface IMailService {
  send(to: string, subject: string, body: string): Promise<void>;
}

// 2. Create implementations
@Injectable()
class SendGridMailService implements IMailService {
  async send(to: string, subject: string, body: string) {
    // SendGrid API call
  }
}

@Injectable()
class MockMailService implements IMailService {
  async send(to: string, subject: string, body: string) {
    console.log(\`[MOCK] Email to \${to}: \${subject}\`);
  }
}

// 3. Register with a token
@Module({
  providers: [
    {
      provide: 'MAIL_SERVICE',
      useClass: process.env.NODE_ENV === 'test'
        ? MockMailService       // In tests, use mock
        : SendGridMailService,  // In production, use real
    },
  ],
})
export class MailModule {}

// 4. Inject the abstraction
@Injectable()
export class AuthService {
  constructor(
    @Inject('MAIL_SERVICE') private mailService: IMailService,
  ) {}

  async register(email: string) {
    // Don't care if it's SendGrid or Mock — just works!
    await this.mailService.send(email, 'Welcome!', 'Thanks for signing up.');
  }
}`}
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-blue-800 dark:text-blue-300 text-sm"><strong>🔑 Why This Is Powerful:</strong> Swap email providers (SendGrid → Mailgun) by changing ONE line in the module. Zero changes to AuthService. This is the Dependency Inversion Principle in action.</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Circular Dependencies</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ⚠️ Problem: ServiceA needs ServiceB, ServiceB needs ServiceA
// This creates a circular dependency — NestJS can't resolve it!

// ✅ Solution: forwardRef()
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(
    @Inject(forwardRef(() => DogsService))
    private dogsService: DogsService,
  ) {}
}

@Injectable()
export class DogsService {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private catsService: CatsService,
  ) {}
}

// Module level too:
@Module({
  imports: [forwardRef(() => DogsModule)],
})
export class CatsModule {}

// 🔑 Best Practice: If you need forwardRef, reconsider your architecture.
// Circular deps usually mean you need to extract shared logic into a third service.`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">PaymentService</code> interface with a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">charge()</code> method</li>
            <li>Implement <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">StripePaymentService</code> and <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">MockPaymentService</code></li>
            <li>Use a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">useClass</code> provider to swap implementations based on NODE_ENV</li>
            <li>Inject the payment service into an <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">OrdersService</code> using a token</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">new Service()</code> directly — bypasses DI, breaks testability and lifecycle management.</li>
            <li>Circular dependencies — restructure into a shared third module instead of using forwardRef everywhere.</li>
            <li>Forgetting to register providers in the module — "Nest can't resolve dependencies of X" error.</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            Move to <Link href="/learn/nestjs/nj10-dto-validation" className="font-bold underline hover:text-emerald-600">NJ-10 — DTOs & Validation</Link> to learn how to validate incoming data automatically with class-validator.
          </p>
        </section>
      </div>
    </>
  );
}
