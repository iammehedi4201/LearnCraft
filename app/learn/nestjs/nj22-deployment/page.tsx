/**
 * NJ-22 — Production Deployment
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ22Deployment(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"><span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-22</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Production Deployment</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div><h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Deploying NestJS involves building, environment config, Docker, health checks, logging, security hardening, and choosing a hosting platform.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">The Final Step</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">This is where everything you've learned comes together into a production-ready, deployable application.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Production Build</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`# Build the production bundle
npm run build

# This compiles TypeScript → JavaScript in /dist folder
# Run with:
node dist/main.js

# ✅ Production main.ts setup:
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],  // Reduce logging in prod
  });

  // Security
  app.use(helmet());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  // Performance
  app.use(compression());

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Global prefix
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(\`🚀 Application running on port \${port}\`, 'Bootstrap');
}
bootstrap();`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Docker</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Security: run as non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000
CMD ["node", "dist/main.js"]

# .dockerignore
node_modules
dist
.git
.env

# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_HOST=postgres
      - DATABASE_PORT=5432
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: nestjs_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  pgdata:`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Health Checks</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install @nestjs/terminus

import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}

// GET /health → { status: 'ok', info: { database: { status: 'up' } } }
// Load balancers and Kubernetes use this to check if the app is alive`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Security Checklist</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Item</th>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">How</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium">HTTP Headers</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">helmet() — sets security headers</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium">CORS</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">enableCors() with specific origins</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium">Rate Limiting</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">@nestjs/throttler — prevent abuse</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium">Input Validation</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">ValidationPipe + class-validator</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium">Auth</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">JWT + Guards + bcrypt password hashing</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium">Env Variables</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">ConfigModule + Joi validation. Never commit .env</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium">SQL Injection</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">ORMs (TypeORM/Prisma) use parameterized queries</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-medium">Error Handling</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Global exception filter — never expose stack traces in prod</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Deployment Platforms</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// 🚀 Popular deployment targets for NestJS:

// 1️⃣ Railway (easiest)
//    - Connect GitHub repo → auto-deploy
//    - Built-in PostgreSQL, Redis
//    - Free tier available

// 2️⃣ DigitalOcean App Platform
//    - Dockerfile-based deployment
//    - Managed databases
//    - $5/month

// 3️⃣ AWS (most scalable)
//    - ECS/Fargate for Docker containers
//    - Lambda with @nestjs/serverless
//    - RDS for PostgreSQL, ElastiCache for Redis

// 4️⃣ Vercel (serverless)
//    npm install @nestjs/platform-express @vercel/node
//    // Requires adapter configuration

// 5️⃣ VPS (full control)
//    - Ubuntu + Docker + Nginx reverse proxy
//    - PM2 for process management
//    - Let's Encrypt for SSL

// Production environment variables:
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=<long-random-string>
ALLOWED_ORIGINS=https://yourdomain.com`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Final Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a Dockerfile and docker-compose.yml for your NestJS project</li>
            <li>Add health checks with @nestjs/terminus</li>
            <li>Set up rate limiting with @nestjs/throttler</li>
            <li>Deploy to Railway or DigitalOcean and verify all endpoints work</li>
            <li>Run your e2e tests against the production URL</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">synchronize: true</code> in TypeORM in production — data loss risk. Use migrations.</li>
            <li>Committing .env files to git — use .env.example instead.</li>
            <li>Not setting up health checks — load balancers can't detect unhealthy instances.</li>
            <li>Running as root in Docker — always create a non-root user.</li>
            <li>Exposing stack traces in error responses — use a global exception filter.</li>
          </ul>
        </section>

        {/* Graduation */}
        <section className="mt-12 p-8 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-center">
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            NestJS Elite Mastery — Complete!
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto mb-6">
            You've completed all 22 lessons covering TypeScript, OOP, Decorators, SOLID, Modules, Controllers, Services, DI, Validation, Pipes, Guards, Interceptors, Filters, Middleware, Authentication, Database, Config, Testing, Architecture, Microservices, and Deployment.
          </p>
          <p className="text-slate-800 dark:text-slate-200 font-bold text-lg mb-6">
            You now have the knowledge to build production-grade NestJS APIs.
          </p>
          <Link
            href="/learn/nestjs"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Curriculum Hub
          </Link>
        </section>
      </div>
    </>
  );
}

