/**
 * NJ-27 — Caching & Redis
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ27Caching(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20"><span className="font-display font-bold text-sm tracking-wider">NJ-27</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Caching & Redis</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS has a built-in CacheModule which provides a unified API for various stores (memory, Redis, Memcached). It features automatic interceptors and an injectable CacheManager.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">In Express, you manually handle cache logic in route handlers or write your own middleware. NestJS automates this with the @CacheKey and @CacheTTL decorators.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Basic Memory Caching</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install cache-manager

// app.module.ts
import { CacheModule, Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5,        // Default Time To Live: 5 seconds
      max: 100,      // Max items in cache
      isGlobal: true, 
    }),
  ],
})
export class AppModule {}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Automatic Response Caching</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  
  // ✅ Automatically cache GET response for default TTL
  @UseInterceptors(CacheInterceptor)
  @Get()
  getStats() {
    return this.statsService.calculateComplexStats();
  }

  // ✅ Customize caching per endpoint
  @CacheKey('top_users')
  @CacheTTL(600)  // 10 minutes (600 seconds)
  @UseInterceptors(CacheInterceptor)
  @Get('top')
  getTopUsers() {
    return this.usersService.findTop();
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Manual Cache Management</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findOne(id: number) {
    const cacheKey = \`user_\${id}\`;
    
    // 1. Try to get from cache
    const cachedUser = await this.cacheManager.get(cacheKey);
    if (cachedUser) return cachedUser;

    // 2. Not in cache → fetch from DB
    const user = await this.userRepo.findOne(id);

    // 3. Save to cache
    await this.cacheManager.set(cacheKey, user, { ttl: 3600 });
    return user;
  }

  async resetCache() {
    await this.cacheManager.reset(); // Clear ALL cache
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Redis Integration</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install cache-manager-redis-store redis

// app.module.ts
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 600,
    }),
  ],
})
export class AppModule {}

// 🔑 Now, your manual CacheManager and CacheInterceptor 
// will automatically use Redis instead of memory!`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Enable <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">CacheInterceptor</code> on a slow heavy endpoint</li>
            <li>Implement manual caching for a user profile by ID with a 1-hour TTL</li>
            <li>Set up a local Redis instance and configure <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">CacheModule</code> to use it</li>
            <li>Create an "Admin Clear Cache" endpoint that resets the entire cache for testing</li>
          </ul>
        </section>

        <section className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-950/30 dark:to-red-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            NestJS Elite Curriculum — Completed!
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto mb-6">
            You've gone above and beyond, mastering not just the basics, but also Elite production patterns like Swagger, Real-time WebSockets, Task Scheduling, and Redis Caching.
          </p>
          <p className="text-slate-800 dark:text-slate-200 font-bold text-lg mb-6">
            You're ready to build standard-setting backend architectures.
          </p>
          <Link
            href="/learn/nestjs"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Curriculum Hub
          </Link>
        </section>
      </div>
    </>
  );
}
