/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-10 — DTOs & Validation
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ10DTOValidation(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
                <span className="font-display font-bold text-sm tracking-wider">NJ-10</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">DTOs & Validation</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div><h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">NestJS Concept</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">DTOs (Data Transfer Objects) define the shape of data. Combined with class-validator, they validate incoming requests automatically before your controller runs.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express: manually validate req.body with if/else or Joi. NestJS: decorators on DTO classes + ValidationPipe = automatic.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Setup — Install Dependencies</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install class-validator class-transformer

// Then enable ValidationPipe globally in main.ts:
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // Strip properties that don't have decorators
    forbidNonWhitelisted: true, // Throw error if extra properties are sent
    transform: true,            // Auto-transform payloads to DTO instances
  }));
  
  await app.listen(3000);
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Creating DTOs with Validation</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import {
  IsString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, IsEnum, MinLength, MaxLength,
  IsArray, IsBoolean, Min, Max, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// ✅ CreateUserDto — validates POST /users body
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @IsEnum(['user', 'admin', 'moderator'])
  @IsOptional()
  role?: string;

  @IsNumber()
  @Min(13)
  @Max(120)
  @IsOptional()
  age?: number;
}

// ✅ UpdateUserDto — all fields optional (for PATCH/PUT)
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // PartialType makes ALL properties from CreateUserDto optional
  // Validation rules are preserved but only applied when present
}

// ✅ Nested DTO validation
class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  country: string;
}

class CreateOrderDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @ValidateNested()           // Validate nested object
  @Type(() => AddressDto)     // Transform to AddressDto instance
  shippingAddress: AddressDto;

  @IsArray()
  @IsString({ each: true })   // Validate each element in array
  tags: string[];
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Using DTOs in Controllers</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // ✅ By the time this runs, createUserDto is GUARANTEED to be valid:
    // - name: non-empty string, 2-50 chars
    // - email: valid email format
    // - password: at least 8 chars
    // - role: one of user/admin/moderator (if provided)
    // - age: number between 13-120 (if provided)
    // - Extra properties are stripped (whitelist: true)
    
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // ✅ Only provided fields are validated
    // Send { name: "New Name" } → only name is validated
    return this.usersService.update(+id, updateUserDto);
  }
}

// ❌ What happens when validation fails:
// POST /users with { name: "", email: "not-an-email" }
// Response: 400 Bad Request
// {
//   "statusCode": 400,
//   "message": [
//     "name should not be empty",
//     "name must be longer than or equal to 2 characters",
//     "email must be an email"
//   ],
//   "error": "Bad Request"
// }`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Express vs NestJS — Validation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express (manual)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`router.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  
  // Manual validation 😩
  if (!name || name.length < 2) {
    return res.status(400).json({
      error: 'Name is required, min 2 chars'
    });
  }
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      error: 'Valid email required'
    });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({
      error: 'Password min 8 chars'
    });
  }
  
  // 20+ lines just for validation...
  const user = createUser(req.body);
  res.json(user);
});`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS (automatic)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`// DTO handles ALL validation
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}

// Controller is clean — 3 lines
@Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}

// ✅ Validation is automatic
// ✅ Error messages are auto-generated
// ✅ DTOs are reusable
// ✅ Type-safe end-to-end`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Validation Decorators Cheat Sheet</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Decorator</th>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@IsString()</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Must be a string</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@IsNumber()</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Must be a number</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@IsEmail()</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Must be valid email format</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@IsNotEmpty()</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Cannot be empty/null/undefined</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@IsOptional()</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Skip validation if undefined</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@MinLength(n)</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">String min length</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@Min(n) / @Max(n)</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Number min/max value</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@IsEnum(enum)</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Must be a value from the enum</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@IsArray()</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Must be an array</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@ValidateNested()</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Validate nested objects</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">CreateProductDto</code> with: name (string, 3-100 chars), price (number, min 0), category (enum), description (optional string)</li>
            <li>Create an <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">UpdateProductDto</code> using PartialType</li>
            <li>Enable ValidationPipe globally and test with invalid data</li>
            <li>Add a nested <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">DimensionsDto</code> with width, height, weight validation</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Forgetting to enable <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">ValidationPipe</code> globally — decorators exist but don't run.</li>
            <li>Using interfaces instead of classes for DTOs — class-validator needs classes (decorators don't work on interfaces).</li>
            <li>Not using <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">whitelist: true</code> — allows malicious extra fields to pass through.</li>
            <li>Forgetting <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">@Type(() ={'>'} NestedDto)</code> for nested object validation.</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-green-900 dark:text-green-400">🎉 Foundations Complete!</h3>
          <p className="text-green-900 dark:text-green-300">
            You've finished the NestJS Foundations! You understand Modules, Controllers, Services, DI, and Validation.
            Move to <Link href="/learn/nestjs/nj11-pipes" className="font-bold underline hover:text-green-600">NJ-11 — Pipes & Transformation</Link> to start the Intermediate section.
          </p>
        </section>
      </div>
    </>
  );
}
