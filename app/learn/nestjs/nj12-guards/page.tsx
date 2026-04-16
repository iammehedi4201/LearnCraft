/**
 * NJ-12 — Guards & Authorization
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ12Guards(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/20"><span className="font-display font-bold text-sm tracking-wider">NJ-12</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Guards & Authorization</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-purple-600" /></div><h4 className="font-display text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Guards determine whether a request can proceed. They implement CanActivate and return true/false. Used for authentication, authorization, and role-based access.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express uses middleware functions for auth. NestJS guards are more powerful — they have access to execution context and metadata.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Basic Auth Guard</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = verifyToken(token); // Your JWT verify logic
      request.user = decoded;             // Attach user to request
      return true;                         // ✅ Allow access
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

// Usage:
@Controller('tasks')
@UseGuards(AuthGuard)           // Protect entire controller
export class TasksController {
  @Get()
  findAll() { /* Only authenticated users */ }

  @Post()
  @UseGuards(AuthGuard)         // Or protect specific routes
  create(@Body() dto: CreateTaskDto) { /* Only authenticated users */ }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Role-Based Guard</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// ✅ Step 1: Create a custom decorator to set roles metadata
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// ✅ Step 2: Create the guard
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Read the @Roles() metadata from the handler
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles specified, allow access
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}

// ✅ Step 3: Use on routes
@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)  // Auth first, then role check
export class AdminController {
  
  @Get('dashboard')
  @Roles('admin')                   // Only admins
  getDashboard() { return 'Admin Dashboard'; }

  @Get('reports')
  @Roles('admin', 'moderator')     // Admins and moderators
  getReports() { return 'Reports'; }

  @Delete('users/:id')
  @Roles('admin')                   // Only admins can delete
  deleteUser(@Param('id') id: string) { /* ... */ }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Express vs NestJS — Auth</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Auth middleware
function auth(req, res, next) {
  const token = req.headers.auth;
  if (!token) return res.status(401).send();
  req.user = verify(token);
  next();
}

// Role middleware
function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send();
    }
    next();
  };
}

app.delete('/users/:id',
  auth,
  requireRole('admin'),
  deleteUser
);`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Clean, declarative, testable
@Delete(':id')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
deleteUser(@Param('id') id: string) {
  return this.usersService.remove(id);
}

// ✅ Benefits:
// - Guards are classes → testable
// - Metadata via decorators → readable
// - Access to ExecutionContext
// - Can be async
// - Auto 403 Forbidden response`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create an <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">ApiKeyGuard</code> that checks for an x-api-key header</li>
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@Permissions()</code> decorator and <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">PermissionsGuard</code></li>
            <li>Stack guards: ApiKeyGuard → AuthGuard → RolesGuard on a delete endpoint</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj13-interceptors" className="font-bold underline hover:text-emerald-600">NJ-13 — Interceptors</Link> to learn how to transform responses, add logging, and handle caching.</p>
        </section>
      </div>
    </>
  );
}
