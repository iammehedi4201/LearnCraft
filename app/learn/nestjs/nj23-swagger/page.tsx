/**
 * NJ-23 — API Documentation (Swagger)
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ23Swagger(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20"><span className="font-display font-bold text-sm tracking-wider">NJ-23</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">API Documentation (Swagger)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">@nestjs/swagger automates API documentation by reading your decorators and DTOs. It provides a web-based Swagger UI for testing endpoints.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express requires manual YAML/JSON files or swagger-jsdoc comments. NestJS automatically syncs docs with your code.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Setup</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install @nestjs/swagger swagger-ui-express

// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('LearnCraft API')
    .setDescription('The core API for the LearnCraft platform')
    .setVersion('1.0')
    .addTag('users')
    .addTag('tasks')
    .addBearerAuth() // Enable JWT auth in Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Docs available at /api/docs

  await app.listen(3000);
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Documenting DTOs</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Mehedi Hasan',
    description: 'The full name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'mehedi@example.com',
    description: 'The email address used for login',
  })
  email: string;

  @ApiPropertyOptional({
    example: 25,
    description: 'Years since birth',
    minimum: 13,
  })
  age?: number;
}

// 🔑 Tip: You can automate this further with the Swagger CLI Plugin
// which automatically reads class-validator decorators!`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Controller Integration</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth() // Require JWT for all endpoints in this controller
@Controller('users')
export class UsersController {
  
  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Install Swagger and set up the interactive UI at <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">/api/docs</code></li>
            <li>Add <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@ApiProperty</code> to your Task DTOs</li>
            <li>Group your endpoints using <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@ApiTags</code></li>
            <li>Enable Bearer Authentication and test a protected route from the Swagger UI</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj24-file-uploads" className="font-bold underline hover:text-emerald-600">NJ-24 — File Uploads & Static Assets</Link> to handle media in your API.</p>
        </section>
      </div>
    </>
  );
}
