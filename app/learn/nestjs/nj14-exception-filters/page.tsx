/**
 * NJ-14 — Exception Filters
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ14ExceptionFilters(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/20"><span className="font-display font-bold text-sm tracking-wider">NJ-14</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Exception Filters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-purple-600" /></div><h4 className="font-display text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Exception filters catch unhandled exceptions and format error responses. NestJS has a built-in filter, but custom filters give you full control over error formatting.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express uses error-handling middleware (4 params). NestJS uses catch decorators with typed exception handling.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Built-in HTTP Exceptions</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import {
  BadRequestException,     // 400
  UnauthorizedException,   // 401
  ForbiddenException,      // 403
  NotFoundException,       // 404
  ConflictException,       // 409
  InternalServerErrorException, // 500
} from '@nestjs/common';

@Injectable()
export class UsersService {
  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(\`User #\${id} not found\`);
      // Auto-response:
      // { "statusCode": 404, "message": "User #5 not found", "error": "Not Found" }
    }
    return user;
  }

  create(dto: CreateUserDto) {
    const exists = this.users.find(u => u.email === dto.email);
    if (exists) {
      throw new ConflictException('Email already registered');
    }
    // ...
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Custom Exception Filter</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()  // Catches ALL exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';

    // ✅ Custom error response format
    response.status(status).json({
      success: false,
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any).message,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });

    // Log the error (in production, send to monitoring service)
    console.error(\`[\${request.method}] \${request.url} → \${status}\`, exception);
  }
}

// Apply globally in main.ts:
app.useGlobalFilters(new AllExceptionsFilter());`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Typed Exception Filters</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Catch only specific exception types
@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(404).json({
      success: false,
      error: 'Resource not found',
      suggestion: 'Check if the ID exists or verify the URL',
    });
  }
}

// ✅ Custom business exception
export class InsufficientFundsException extends HttpException {
  constructor(balance: number, amount: number) {
    super({
      message: \`Insufficient funds. Balance: $\${balance}, Requested: $\${amount}\`,
      errorCode: 'INSUFFICIENT_FUNDS',
    }, HttpStatus.BAD_REQUEST);
  }
}

// Usage:
throw new InsufficientFundsException(50, 100);`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a global <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">HttpExceptionFilter</code> with a standardized error response format</li>
            <li>Create a custom <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">BusinessException</code> class with error codes</li>
            <li>Add error logging that captures request context (user, IP, timestamp)</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj15-middleware" className="font-bold underline hover:text-emerald-600">NJ-15 — Middleware</Link> to learn request/response middleware — the feature Express developers already know.</p>
        </section>
      </div>
    </>
  );
}
