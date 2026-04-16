/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-08 — Providers & Services
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ08Services(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
                <span className="font-display font-bold text-sm tracking-wider">NJ-08</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Providers & Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div><h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">NestJS Concept</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Services contain business logic. Marked with @Injectable(), they can be injected into controllers and other services via the DI container.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express has no service layer concept. You import functions directly. NestJS enforces separation with injectable classes.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Creating a Service</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// 🔑 @Injectable() marks this class as a provider
// NestJS can now manage its lifecycle and inject it anywhere
@Injectable()
export class TasksService {
  // In-memory storage (replaced with DB later)
  private tasks = [
    { id: 1, title: 'Learn NestJS', status: 'in_progress' },
    { id: 2, title: 'Build API', status: 'pending' },
  ];

  // ✅ Business logic — NO HTTP concerns here
  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new NotFoundException(\`Task #\${id} not found\`);
      // ☝️ NestJS auto-converts this to a 404 JSON response
    }
    return task;
  }

  create(dto: CreateTaskDto) {
    const newTask = {
      id: Date.now(),
      ...dto,
      status: 'pending',
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, dto: UpdateTaskDto) {
    const task = this.findOne(id);  // Throws 404 if not found
    Object.assign(task, dto);
    return task;
  }

  remove(id: number) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new NotFoundException(\`Task #\${id} not found\`);
    }
    this.tasks.splice(index, 1);
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Custom Providers — Advanced DI</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Standard provider (most common)
@Module({
  providers: [TasksService],
  // Shorthand for: { provide: TasksService, useClass: TasksService }
})

// ✅ useClass — swap implementation
@Module({
  providers: [
    {
      provide: 'NOTIFICATION_SERVICE',
      useClass: process.env.NODE_ENV === 'production'
        ? SmsNotificationService
        : ConsoleNotificationService,
    },
  ],
})

// ✅ useValue — inject a constant
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: 'sk-12345-secret-key',
    },
  ],
})
// Inject with: constructor(@Inject('API_KEY') private apiKey: string)

// ✅ useFactory — async creation with dependencies
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return createConnection(dbConfig);
      },
      inject: [ConfigService],  // Dependencies for the factory
    },
  ],
})`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Service Scopes</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Injectable, Scope } from '@nestjs/common';

// DEFAULT scope — singleton (one instance for the whole app)
@Injectable()
export class AppService {}

// REQUEST scope — new instance per request
@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {
  // Good for: request-specific data, user context
  // ⚠️ Performance cost — new instance every request
}

// TRANSIENT scope — new instance per injection
@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {
  // Each consumer gets its own instance
  // Good for: stateful services that shouldn't share state
}

// 🔑 Default singleton is best for 95% of cases.
// Only use REQUEST/TRANSIENT when you have a specific reason.`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Express vs NestJS — Service Layer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express (no services)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Logic mixed in route handlers
router.get('/:id', async (req, res) => {
  try {
    const user = await db.query(
      'SELECT * FROM users WHERE id = $1',
      [req.params.id]
    );
    if (!user) {
      return res.status(404).json({
        error: 'Not found'
      });
    }
    // Send notification...
    // Log activity...
    // Format response...
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS (clean separation)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Controller — thin, delegates to service
@Get(':id')
findOne(@Param('id') id: string) {
  return this.usersService.findOne(+id);
}

// Service — all business logic
@Injectable()
export class UsersService {
  constructor(
    private db: DatabaseService,
    private notifications: NotifService,
    private logger: LoggerService,
  ) {}

  async findOne(id: number) {
    const user = await this.db.findUser(id);
    if (!user) throw new NotFoundException();
    this.logger.log(\`User \${id} accessed\`);
    return user;
  }
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">ProductsService</code> with CRUD operations using in-memory storage</li>
            <li>Add a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">useValue</code> provider for app configuration</li>
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">useFactory</code> provider that reads from environment variables</li>
            <li>Inject ProductsService into a controller and test all CRUD endpoints</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Forgetting <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">@Injectable()</code> — without it, NestJS can't inject the service.</li>
            <li>Not adding the service to <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">providers</code> array in the module — "Nest can't resolve dependencies" error.</li>
            <li>Using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">new Service()</code> instead of constructor injection — breaks DI and testability.</li>
            <li>Overusing REQUEST scope — significant performance overhead for most use cases.</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            Move to <Link href="/learn/nestjs/nj09-dependency-injection" className="font-bold underline hover:text-emerald-600">NJ-09 — Dependency Injection</Link> to understand HOW NestJS resolves and injects dependencies automatically.
          </p>
        </section>
      </div>
    </>
  );
}
