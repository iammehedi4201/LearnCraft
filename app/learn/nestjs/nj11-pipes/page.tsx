/**
 * NJ-11 — Pipes & Transformation
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ11Pipes(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/20"><span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-11</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Pipes & Transformation</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-purple-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-purple-600" /></div><h4 className="font-display text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Pipes transform input data or validate it before the route handler runs. They sit between the request and the controller method.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express uses middleware for validation/transformation. NestJS pipes are more targeted — they operate on specific parameters.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Built-in Pipes</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { ParseIntPipe, ParseBoolPipe, ParseUUIDPipe, DefaultValuePipe } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  
  // ✅ ParseIntPipe — auto-convert string param to number
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // id is guaranteed to be a number
    // "abc" → 400 Bad Request automatically
    return this.tasksService.findOne(id);
  }

  // ✅ ParseBoolPipe — convert "true"/"false" strings to booleans
  @Get()
  findAll(@Query('active', ParseBoolPipe) active: boolean) {
    return this.tasksService.findAll(active);
  }

  // ✅ ParseUUIDPipe — validate UUID format
  @Get(':uuid')
  findByUuid(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.tasksService.findByUuid(uuid);
  }

  // ✅ DefaultValuePipe — provide defaults for optional params
  @Get()
  findPaginated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.tasksService.findPaginated(page, limit);
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Custom Pipes</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

// ✅ Custom validation pipe
@Injectable()
export class ParseTaskStatusPipe implements PipeTransform {
  private readonly allowedStatuses = ['pending', 'in_progress', 'done'];

  transform(value: any, metadata: ArgumentMetadata) {
    const status = value.toLowerCase();
    if (!this.allowedStatuses.includes(status)) {
      throw new BadRequestException(
        \`"\${value}" is not a valid status. Allowed: \${this.allowedStatuses.join(', ')}\`
      );
    }
    return status;
  }
}

// Usage:
@Patch(':id/status')
updateStatus(
  @Param('id', ParseIntPipe) id: number,
  @Body('status', ParseTaskStatusPipe) status: string,
) {
  return this.tasksService.updateStatus(id, status);
}

// ✅ Custom transformation pipe
@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      return value.trim();
    }
    if (typeof value === 'object' && value !== null) {
      // Trim all string properties
      for (const key of Object.keys(value)) {
        if (typeof value[key] === 'string') {
          value[key] = value[key].trim();
        }
      }
    }
    return value;
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Pipe Scopes</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// 1️⃣ Parameter-level (most specific)
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {}

// 2️⃣ Method-level
@Post()
@UsePipes(new ValidationPipe({ whitelist: true }))
create(@Body() dto: CreateTaskDto) {}

// 3️⃣ Controller-level
@Controller('tasks')
@UsePipes(TrimPipe)
export class TasksController {}

// 4️⃣ Global-level (in main.ts)
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
}));

// 🔑 Execution order: Global → Controller → Method → Parameter`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">ParseSortOrderPipe</code> that only allows "asc" or "desc"</li>
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">SanitizeHtmlPipe</code> that strips HTML tags from string inputs</li>
            <li>Chain multiple pipes: DefaultValuePipe → ParseIntPipe → custom RangePipe</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj12-guards" className="font-bold underline hover:text-emerald-600">NJ-12 — Guards & Authorization</Link> to learn how to protect your routes.</p>
        </section>
      </div>
    </>
  );
}

