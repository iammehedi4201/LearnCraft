/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-03 — Decorators Deep Dive
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * CORE CONCEPT
 * ────────────
 * Decorators are special functions that attach metadata to classes, methods,
 * properties, or parameters. They use the @ syntax and are THE defining feature
 * of NestJS. Without understanding decorators, NestJS code looks like magic.
 *
 * WHY THIS MATTERS FOR NESTJS
 * ───────────────────────────
 * Every NestJS concept uses decorators:
 * @Module, @Controller, @Injectable, @Get, @Post, @Body, @Param, @UseGuards...
 * They tell NestJS HOW to wire your classes together.
 *
 * EXPRESS.JS COMPARISON
 * ─────────────────────
 * Express has no decorators. You wire everything manually with app.get(),
 * app.use(), etc. NestJS decorators are declarative — they describe WHAT
 * your code does, not HOW to wire it.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ03Decorators(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                <span className="font-display font-bold text-sm tracking-wider">NJ-03</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Decorators Deep Dive</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-amber-600" /></div>
                  <h4 className="font-display text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Core Concept</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Decorators are functions that attach metadata to classes, methods, properties, or parameters using the @ syntax. They are THE defining feature of NestJS.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div>
                  <h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">Why NestJS Needs This</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">@Module, @Controller, @Injectable, @Get, @Post, @Body, @Param, @UseGuards — every NestJS building block IS a decorator.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div>
                  <h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express has no decorators. You wire everything manually. NestJS decorators are declarative — they describe WHAT your code does, not HOW.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div>
                  <h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Learning Goal</h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Build and understand all 4 types of decorators. After this, NestJS code stops looking like magic.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
        </div>

        {/* Section 1: What are Decorators? */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. What Are Decorators?</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">A decorator is just a function that returns a function. It "wraps" something to add extra behavior or metadata. Think of it like a sticker you put on a class to give it special powers.</p>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ⚙️ Required: enable in tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true   // NestJS needs this
  }
}

// There are 4 types of decorators in TypeScript:
// 1. Class Decorators       → @Controller, @Module, @Injectable
// 2. Method Decorators      → @Get, @Post, @UseGuards
// 3. Property Decorators    → @Column (TypeORM)
// 4. Parameter Decorators   → @Body, @Param, @Query`}
            </pre>
          </div>
        </section>

        {/* Section 2: Class Decorators */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Class Decorators</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Applied to the class constructor. They can modify or replace the class definition. NestJS uses them to mark classes as controllers, services, modules, etc.</p>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Simple class decorator
function Logger(constructor: Function) {
  console.log(\`Class created: \${constructor.name}\`);
}

@Logger
class UserService {
  // When this class is loaded, Logger runs automatically
  // Output: "Class created: UserService"
}

// ✅ Decorator Factory (with arguments) — this is what NestJS uses
function Controller(prefix: string) {
  return function (constructor: Function) {
    // Store the route prefix as metadata
    Reflect.defineMetadata("prefix", prefix, constructor);
    console.log(\`Route prefix set: /\${prefix}\`);
  };
}

@Controller("users")
class UsersController {
  // NestJS reads the "users" metadata to map routes
}

// ✅ Real NestJS usage:
// @Controller('users')   → maps to /users/*
// @Injectable()          → marks as injectable service
// @Module({...})         → defines a module with imports/providers/controllers`}
            </pre>
          </div>
        </section>

        {/* Section 3: Method Decorators */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Method Decorators</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Method decorator — wraps a method with extra behavior
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${propertyKey} with args:\`, args);
    const result = originalMethod.apply(this, args);
    console.log(\`\${propertyKey} returned:\`, result);
    return result;
  };
}

class MathService {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}

const math = new MathService();
math.add(2, 3);
// Output:
// Calling add with args: [2, 3]
// add returned: 5

// ✅ Decorator Factory (NestJS pattern)
function Get(path: string = "") {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("method", "GET", descriptor.value);
    Reflect.defineMetadata("path", path, descriptor.value);
  };
}

// ✅ Real NestJS usage:
// @Get()           → GET /
// @Post()          → POST /
// @Get(':id')      → GET /:id
// @UseGuards(AuthGuard) → apply guard to this method`}
            </pre>
          </div>
        </section>

        {/* Section 4: Parameter Decorators */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Parameter Decorators</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Parameter decorator — marks a specific parameter
function Body(target: any, propertyKey: string, parameterIndex: number) {
  console.log(\`@Body applied to parameter \${parameterIndex} of \${propertyKey}\`);
  // Store metadata about which parameter to inject request body into
}

class UsersController {
  createUser(@Body dto: any) {
    // NestJS reads the @Body metadata and automatically
    // extracts req.body and passes it as 'dto'
  }
}

// ✅ Real NestJS parameter decorators:
// @Body()          → req.body
// @Param('id')     → req.params.id
// @Query('page')   → req.query.page
// @Headers('auth') → req.headers.auth
// @Req()           → raw request object
// @Res()           → raw response object`}
            </pre>
          </div>
        </section>

        {/* Section 5: Property Decorators */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Property Decorators</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Property decorator — adds metadata to a class property
function Column(options?: { type?: string; nullable?: boolean }) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("column", options || {}, target, propertyKey);
  };
}

function IsEmail() {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("validation", "email", target, propertyKey);
  };
}

// ✅ Used in TypeORM entities and class-validator DTOs
class User {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  @IsEmail()
  email: string;

  @Column({ type: "boolean", nullable: true })
  isActive: boolean;
}

// 🏗️ Real NestJS/TypeORM usage:
// @Column()          → database column mapping
// @IsString()        → validation decorator
// @IsEmail()         → email format validation
// @IsNotEmpty()      → required field validation`}
            </pre>
          </div>
        </section>

        {/* Express vs NestJS */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">6. Express vs NestJS — With Decorators</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express (manual wiring)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// Every route must be manually registered
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateBody, createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, admin, deleteUser);

app.use("/users", router);
// 👆 Lots of manual wiring`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS (declarative)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`@Controller('users')
class UsersController {
  @Get()
  findAll() { ... }

  @Get(':id')
  findOne(@Param('id') id: string) { ... }

  @Post()
  create(@Body() dto: CreateUserDto) { ... }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id, @Body() dto) { ... }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  remove(@Param('id') id: string) { ... }
}
// 👆 Self-documenting, declarative`}
              </pre>
            </div>
          </div>
        </section>

        {/* Mini Challenge */}
        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <p className="text-amber-900 dark:text-amber-300 mb-4">Create your own decorators:</p>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@Deprecated</code> class decorator that logs a warning when the class is instantiated</li>
            <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@MeasureTime</code> method decorator that logs how long a method takes to execute</li>
            <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@Validate</code> parameter decorator that checks if a parameter is not null/undefined</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Forgetting to enable <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">experimentalDecorators</code> and <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">emitDecoratorMetadata</code> in tsconfig.</li>
            <li>Applying decorators in the wrong order — they execute bottom-to-top for methods, left-to-right for parameters.</li>
            <li>Trying to use decorators in plain .js files — they require TypeScript.</li>
            <li>Confusing decorator factories (functions that <em>return</em> decorators) with plain decorators.</li>
          </ul>
        </section>

        {/* Next Step */}
        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            You now understand how decorators work under the hood. Move to <Link href="/learn/nestjs/nj04-solid" className="font-bold underline hover:text-emerald-600">NJ-04 — SOLID Principles</Link> to learn the architectural principles that make NestJS code scalable and maintainable.
          </p>
        </section>
      </div>
    </>
  );
}
