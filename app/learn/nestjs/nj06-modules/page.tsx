/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-06 — Modules
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * Modules are the organizational backbone of NestJS. They group related
 * controllers, services, and other providers into cohesive feature units.
 * Every NestJS app has at least one module — the root AppModule.
 *
 * EXPRESS.JS COMPARISON
 * ─────────────────────
 * Express has no module system — you organize files manually with folders
 * and router.use(). NestJS modules are enforced, making large apps much
 * more maintainable.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ06Modules(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
                <span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-06</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Modules</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div><h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">NestJS Concept</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Modules group related controllers, services, and providers into cohesive feature units. Every app has at least one module — AppModule.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express has no module system — you organize manually with folders and router.use(). NestJS modules are enforced.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-purple-600" /></div><h4 className="font-display text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Under the Hood</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">@Module() stores metadata via Reflect. NestJS reads this at bootstrap to build the dependency injection container.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div><h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Learning Goal</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Create, import, and export modules. Understand shared modules, global modules, and dynamic modules.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
        </div>

        {/* Section 1 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. The @Module() Decorator</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],                    // Other modules this module depends on
  controllers: [UsersController], // Controllers that handle HTTP in this module
  providers: [UsersService],      // Services available for injection in this module
  exports: [UsersService],        // Services available to OTHER modules that import this
})
export class UsersModule {}

// 🔑 Key Rules:
// 1. Controllers are ONLY available in the module that declares them
// 2. Providers are ONLY injectable within the declaring module — UNLESS exported
// 3. imports: [] brings in providers from other modules
// 4. exports: [] makes providers available to importing modules`}
            </pre>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Feature Modules — Organizing by Domain</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Real-world project structure with feature modules
src/
├── app.module.ts              ← Root module (imports all feature modules)
├── users/
│   ├── users.module.ts        ← Feature module
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
├── auth/
│   ├── auth.module.ts         ← Feature module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── guards/
│       └── jwt-auth.guard.ts
├── products/
│   ├── products.module.ts     ← Feature module
│   ├── products.controller.ts
│   └── products.service.ts
└── common/
    ├── common.module.ts       ← Shared module (exported utilities)
    ├── interceptors/
    └── pipes/

// Root module imports everything:
@Module({
  imports: [UsersModule, AuthModule, ProductsModule, CommonModule],
})
export class AppModule {}`}
            </pre>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Sharing Between Modules</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Scenario: AuthModule needs UsersService

// Step 1: Export UsersService from UsersModule
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],        // ← Make it available to other modules
})
export class UsersModule {}

// Step 2: Import UsersModule into AuthModule
@Module({
  imports: [UsersModule],          // ← Now AuthModule can use UsersService
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

// Step 3: Inject UsersService in AuthService
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,  // ← Auto-injected because UsersModule was imported
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    // ...
  }
}`}
            </pre>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Global Modules</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Module, Global } from '@nestjs/common';

// ✅ @Global() makes this module's exports available EVERYWHERE
// No need to import it in every module
@Global()
@Module({
  providers: [LoggerService, ConfigService],
  exports: [LoggerService, ConfigService],
})
export class CommonModule {}

// ⚠️ Use sparingly! Global modules should only contain truly universal services
// Good globals: Logger, Config, Database connection
// Bad globals: UserService, ProductService (these are domain-specific)`}
            </pre>
          </div>
        </section>

        {/* Express vs NestJS */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Express vs NestJS — Organization</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express (manual)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// No enforced structure
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use('/users', userRouter);
app.use('/auth', authRouter);

// Sharing services? Import manually everywhere
// No dependency injection
// No clear boundaries`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS (enforced)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`@Module({
  imports: [
    UsersModule,    // Self-contained
    AuthModule,     // Clear boundaries
    ProductsModule, // Domain isolation
    CommonModule,   // Shared utilities
  ],
})
export class AppModule {}

// Each module is a black box
// Clear import/export contracts
// Automatic dependency injection`}
              </pre>
            </div>
          </div>
        </section>

        {/* Mini Challenge */}
        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">ProductsModule</code> with a controller and service</li>
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">CategoriesModule</code> that depends on ProductsService</li>
            <li>Export ProductsService from ProductsModule and import it in CategoriesModule</li>
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@Global() DatabaseModule</code> that provides a DatabaseService</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Circular dependencies — Module A imports B, B imports A. Use <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">forwardRef()</code> to fix.</li>
            <li>Forgetting to export a service — other modules can't inject it even if they import the module.</li>
            <li>Making everything global — defeats the purpose of module encapsulation.</li>
            <li>Not importing a module before using its providers — NestJS throws "Can't resolve dependencies".</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            Move to <Link href="/learn/nestjs/nj07-controllers" className="font-bold underline hover:text-emerald-600">NJ-07 — Controllers & Routing</Link> to learn how to handle HTTP requests with decorators.
          </p>
        </section>
      </div>
    </>
  );
}

