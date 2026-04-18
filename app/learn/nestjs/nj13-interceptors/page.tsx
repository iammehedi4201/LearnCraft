/**
 * NJ-13 — Interceptors
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ13Interceptors(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/20"><span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-13</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">"Quality Control" (Interceptors)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-purple-600" /></div><h4 className="font-display text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Plain English</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Interceptors are like Quality Control workers. They can check a package BEFORE it arrives (to start a timer) and check it again AFTER it leaves (to stop the timer or wrap it in a nicer box).</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express middleware only runs BEFORE the final response. NestJS interceptors can run before AND after, giving you god-like control over the response data.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. The "Observer" (A Simple Interceptor)</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">
            <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">The "Stopwatch" Metaphor</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Imagine an Interceptor holding a stopwatch. When a request comes in, it clicks "Start" (before). Then it passes the request to the Chef (Controller/Service). Once the food is ready, it comes back to the Interceptor, and it clicks "Stop" (after). Now it knows exactly how long it took to cook!
                </p>
              </div>
            </div>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    console.log(\`[REQ] \${method} \${url}\`);

    return next.handle().pipe(
      tap(() => {
        console.log(\`[RES] \${method} \${url} - \${Date.now() - now}ms\`);
      }),
    );
    // Output:
    // [REQ] GET /users
    // [RES] GET /users - 45ms
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. The "Gift Wrapper" (Transform Interceptor)</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6 font-sans">
            <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 mb-8 flex gap-5 items-start">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 italic">The "Gift Wrapper" Metaphor</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your code might return a simple item like <code className="text-blue-600 font-bold">&#123; user: "Bob" &#125;</code>. A **Transform Interceptor** waits at the exit door. Before the data leaves the building, it wraps it in a beautiful, consistent gift box: <code className="text-blue-600 font-bold">&#123; success: true, data: &#123; user: "Bob" &#125;&#125;</code>.
                </p>
              </div>
            </div>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { map } from 'rxjs';

// ✅ Wrap ALL responses in a standard format
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
        path: context.switchToHttp().getRequest().url,
      })),
    );
  }
}

// Before interceptor:  { id: 1, name: "Mehedi" }
// After interceptor:
// {
//   success: true,
//   data: { id: 1, name: "Mehedi" },
//   timestamp: "2024-01-01T00:00:00.000Z",
//   path: "/users/1"
// }

// Apply globally:
app.useGlobalInterceptors(new TransformInterceptor());`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Timeout & Error Interceptors</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { timeout, catchError } from 'rxjs';
import { TimeoutError } from 'rxjs';

// ✅ Timeout interceptor — kill slow requests
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),  // 5 second timeout
      catchError(err => {
        if (err instanceof TimeoutError) {
          throw new RequestTimeoutException('Request timed out after 5s');
        }
        throw err;
      }),
    );
  }
}

// ✅ Cache interceptor — skip handler if cached
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const key = context.switchToHttp().getRequest().url;

    if (this.cache.has(key)) {
      return of(this.cache.get(key));  // Return cached, skip handler
    }

    return next.handle().pipe(
      tap(data => this.cache.set(key, data)),
    );
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">SerializeInterceptor</code> that removes sensitive fields (password, tokens) from responses</li>
            <li>Build a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">PerformanceInterceptor</code> that logs requests slower than 1 second</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj14-exception-filters" className="font-bold underline hover:text-emerald-600">NJ-14 — Exception Filters</Link> to learn centralized error handling.</p>
        </section>
      </div>
    </>
  );
}

