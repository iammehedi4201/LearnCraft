/**
 * NJ-26 — Task Scheduling (Cron)
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ26Scheduling(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20"><span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-26</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Task Scheduling (Cron)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">@nestjs/schedule provides an easy way to define cron jobs, timeouts, and intervals directly in your service classes using decorators.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">In Express, you typically use `node-cron` or `agenda` manually. In NestJS, scheduling is handled by the framework lifecycle via decorators.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Basic Setup</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install @nestjs/schedule

// app.module.ts
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(), // Initializes the scheduler
  ],
})
export class AppModule {}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Using @Cron Decorator</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  
  // ✅ Run every 45 seconds
  @Cron('45 * * * * *')
  handleCron() {
    console.log('Called when the second is 45');
  }

  // ✅ Run every midnight
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleMidnightCleanup() {
    console.log('Cleaning up old records...');
  }

  // ✅ Run every Sunday at 3:00 AM
  @Cron('0 0 3 * * 0')
  weeklyReport() {
    console.log('Generating weekly analytics...');
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Interval & Timeout</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class HeartbeatService {
  
  // ✅ Run every 10 seconds (10000 ms)
  @Interval(10000)
  handleInterval() {
    console.log('System heartbeat OK');
  }

  // ✅ Run once after 5 seconds
  @Timeout(5000)
  handleOnce() {
    console.log('Init complete, starting background sync...');
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Elite Dynamic Scheduling</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class DynamicTasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  // ✅ Programmatically create a job
  addCronJob(name: string, seconds: string) {
    const job = new CronJob(\`\${seconds} * * * * *\`, () => {
      console.log(\`Job \${name} running!\`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }

  // ✅ List active jobs
  getJobs() {
    const jobs = this.schedulerRegistry.getCronJobs();
    return Array.from(jobs.keys());
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Implement a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">DailyBackupJob</code> that runs every day at 1:00 AM</li>
            <li>Use <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">Interval</code> to check for a specific DB condition every minute</li>
            <li>Create an endpoint that allows adding a one-time <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">Timeout</code> job dynamically using <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">SchedulerRegistry</code></li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj27-caching" className="font-bold underline hover:text-emerald-600">NJ-27 — Caching & Redis</Link> to optimize your application’s speed.</p>
        </section>
      </div>
    </>
  );
}

