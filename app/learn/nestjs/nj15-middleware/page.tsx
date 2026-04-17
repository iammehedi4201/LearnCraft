/**
 * NJ-15 — Middleware
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ15Middleware(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/20"><span className="font-display font-bold text-sm tracking-wider">NJ-15</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">"Lobby Security" (Middleware)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-purple-600" /></div><h4 className="font-display text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Plain English</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Middleware is the security desk in the lobby of a building. It's the very first thing everyone must pass through before they can even speak to the Bouncer (Guard) or use the Filter (Pipe).</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">It's exactly the same! If you know Express middleware (<code className="font-bold">req, res, next</code>), you know NestJS middleware. In fact, all Express middleware works in NestJS perfectly.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Class-Based Middleware</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
    next();  // Pass control to next middleware/handler
  }
}

// Apply in module:
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({ controllers: [UsersController], providers: [UsersService] })
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');       // Apply to /users routes

    // Or more specific:
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });

    // Exclude routes:
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'users/health', method: RequestMethod.GET })
      .forRoutes('users');
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Functional Middleware & Express Packages</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Simple functional middleware
export function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}

// ✅ Use Express middleware packages directly!
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as morgan from 'morgan';

// In main.ts:
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());           // Security headers
  app.use(compression());      // Gzip compression
  app.use(morgan('combined')); // HTTP request logging
  app.enableCors();            // Built-in CORS

  await app.listen(3000);
}

// 🔑 Key Insight: Since NestJS uses Express under the hood,
// ALL Express middleware packages work out of the box!`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. NestJS Request Lifecycle</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// 🔄 The "Office Building" Request Order:
//
// 1. Middleware       → Lobby Security (Logs you in the front desk book)
// 2. Guards           → The Bouncer at the elevator (Checks if you're allowed upstairs)
// 3. Interceptors     → Quality Control BEFORE cooking (Starts a timer)
// 4. Pipes            → The Water Filter (Makes sure your data is perfectly clean)
// 5. Controller       → The Manager (Takes your request and hands it to the chef)
// 6. Interceptors     → Quality Control AFTER cooking (Wraps the food in a nice box)
// 7. Exception Filter → The Safety Net (Catches you if you fall out the window!)
`}
            </pre>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded">
            <p className="text-blue-800 dark:text-blue-300 text-sm"><strong>🔑 When to use Middleware vs Guards vs Interceptors:</strong><br/>• <strong>Middleware:</strong> CORS, logging, compression — anything that doesn't need NestJS context<br/>• <strong>Guards:</strong> Auth/authorization — need access to execution context and metadata<br/>• <strong>Interceptors:</strong> Transform responses, caching, timing — need before AND after handler</p>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">RateLimitMiddleware</code> that allows 100 requests per minute per IP</li>
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">RequestIdMiddleware</code> that adds a unique UUID to each request</li>
            <li>Apply helmet, compression, and CORS in your main.ts</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj16-auth-jwt" className="font-bold underline hover:text-emerald-600">NJ-16 — Authentication (JWT)</Link> to build a real-world auth system with Passport.js.</p>
        </section>
      </div>
    </>
  );
}
