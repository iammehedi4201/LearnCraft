/**
 * NJ-20 — Scalable Folder Structure
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ20FolderStructure(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"><span className="font-display font-bold text-sm tracking-wider">NJ-20</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Scalable Folder Structure</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div><h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">A domain-driven folder structure scales from MVP to enterprise. Each domain module is self-contained with its own controllers, services, DTOs, entities, and tests.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express projects often separate by technical layer (routes/, controllers/, models/). NestJS encourages separation by domain (users/, tasks/, auth/).</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Production-Grade Structure</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`src/
├── main.ts                          # Bootstrap
├── app.module.ts                    # Root module
│
├── config/                          # ⚙️ Configuration
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── validation.ts                # Joi schema
│
├── common/                          # 🔧 Shared utilities
│   ├── common.module.ts
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   ├── roles.decorator.ts
│   │   └── api-paginated.decorator.ts
│   ├── dto/
│   │   └── pagination.dto.ts
│   ├── filters/
│   │   └── all-exceptions.filter.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors/
│   │   ├── transform.interceptor.ts
│   │   ├── logging.interceptor.ts
│   │   └── timeout.interceptor.ts
│   ├── pipes/
│   │   └── parse-mongo-id.pipe.ts
│   ├── middleware/
│   │   └── logger.middleware.ts
│   ├── interfaces/
│   │   └── paginated-result.interface.ts
│   └── constants/
│       └── roles.enum.ts
│
├── database/                        # 🗄️ Database
│   ├── database.module.ts
│   ├── migrations/
│   └── seeds/
│
├── auth/                            # 🔐 Authentication domain
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   └── __tests__/
│       ├── auth.service.spec.ts
│       └── auth.controller.spec.ts
│
├── users/                           # 👤 Users domain
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── interfaces/
│   │   └── user.interface.ts
│   └── __tests__/
│       ├── users.service.spec.ts
│       └── users.controller.spec.ts
│
├── tasks/                           # ✅ Tasks domain
│   ├── tasks.module.ts
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   ├── entities/
│   │   └── task.entity.ts
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   ├── update-task.dto.ts
│   │   └── filter-tasks.dto.ts
│   └── __tests__/
│
└── health/                          # 💓 Health checks
    ├── health.module.ts
    └── health.controller.ts`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Express vs NestJS — Organization Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">❌ Traditional (by layer)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`src/
├── controllers/
│   ├── users.controller.ts
│   ├── tasks.controller.ts
│   └── auth.controller.ts
├── services/
│   ├── users.service.ts
│   ├── tasks.service.ts
│   └── auth.service.ts
├── models/
│   ├── user.model.ts
│   └── task.model.ts
├── routes/
│   ├── users.routes.ts
│   └── tasks.routes.ts
└── middleware/

// ⚠️ Adding a new feature touches
// 4+ folders. Hard to find related code.`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">✅ Domain-driven (NestJS)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`src/
├── users/          ← Everything about users
│   ├── controller
│   ├── service
│   ├── entity
│   ├── dto
│   └── tests
├── tasks/          ← Everything about tasks
│   ├── controller
│   ├── service
│   ├── entity
│   ├── dto
│   └── tests
└── common/         ← Shared cross-cutting

// ✅ Adding a feature = adding ONE folder.
// Everything related is co-located.
// Delete a feature = delete ONE folder.`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Naming Conventions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Type</th>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Naming Pattern</th>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3">Module</td><td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">feature.module.ts</td><td className="px-4 py-3">users.module.ts</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3">Controller</td><td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">feature.controller.ts</td><td className="px-4 py-3">users.controller.ts</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3">Service</td><td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">feature.service.ts</td><td className="px-4 py-3">users.service.ts</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3">Entity</td><td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">feature.entity.ts</td><td className="px-4 py-3">user.entity.ts</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3">DTO</td><td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">action-feature.dto.ts</td><td className="px-4 py-3">create-user.dto.ts</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3">Guard</td><td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">name.guard.ts</td><td className="px-4 py-3">jwt-auth.guard.ts</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3">Pipe</td><td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">name.pipe.ts</td><td className="px-4 py-3">parse-id.pipe.ts</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3">Test</td><td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400">feature.spec.ts</td><td className="px-4 py-3">users.service.spec.ts</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Reorganize your project to follow the domain-driven structure above</li>
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">common/</code> module with shared guards, interceptors, and pipes</li>
            <li>Make sure every module is self-contained and can be deleted without breaking others</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj21-microservices" className="font-bold underline hover:text-emerald-600">NJ-21 — Microservices Basics</Link> to learn distributed system patterns.</p>
        </section>
      </div>
    </>
  );
}
