/**
 * NJ-18 — Configuration & Environment
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ18Config(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"><span className="font-display font-bold text-sm tracking-wider">NJ-18</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Configuration & Environment</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div><h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">@nestjs/config provides ConfigModule to manage .env files, validation with Joi, and typed configuration namespaces. Never hardcode secrets again.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express: manually dotenv.config() + process.env everywhere. NestJS: injectable ConfigService with validation and type safety.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Basic Setup</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install @nestjs/config

// .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=secret
DATABASE_NAME=nestjs_db
JWT_SECRET=my-super-secret-key
JWT_EXPIRATION=3600
PORT=3000

// app.module.ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,          // Available everywhere without importing
      envFilePath: '.env',      // Can also use ['.env.local', '.env']
    }),
  ],
})
export class AppModule {}

// Usage in any service:
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  getPort(): number {
    return this.config.get<number>('PORT', 3000);  // Default: 3000
  }

  getJwtSecret(): string {
    return this.config.getOrThrow<string>('JWT_SECRET');  // Throws if missing
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Validation with Joi</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install joi

import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().min(32).required(),
        JWT_EXPIRATION: Joi.number().default(3600),
      }),
      validationOptions: {
        abortEarly: true,    // Stop on first error
      },
    }),
  ],
})
export class AppModule {}

// ✅ If JWT_SECRET is missing → app REFUSES to start
// Error: "JWT_SECRET" is required`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Typed Configuration Namespaces</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
}));

// config/jwt.config.ts
export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: parseInt(process.env.JWT_EXPIRATION, 10) || 3600,
}));

// app.module.ts
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, jwtConfig],   // Load typed configs
    }),
  ],
})
export class AppModule {}

// Usage with namespace:
@Injectable()
export class DatabaseService {
  constructor(private config: ConfigService) {}

  connect() {
    const host = this.config.get<string>('database.host');
    const port = this.config.get<number>('database.port');
    // Type-safe, organized, clean!
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Set up ConfigModule with Joi validation for all your environment variables</li>
            <li>Create typed configs for database, jwt, and app settings</li>
            <li>Use ConfigService to dynamically configure TypeORM connection</li>
            <li>Create separate .env.development and .env.production files</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj19-testing" className="font-bold underline hover:text-emerald-600">NJ-19 — Testing Strategies</Link> to learn unit, integration, and e2e testing.</p>
        </section>
      </div>
    </>
  );
}
