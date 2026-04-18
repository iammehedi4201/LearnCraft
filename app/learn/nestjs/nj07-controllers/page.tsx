/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NJ-07 — Controllers & Routing
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ07Controllers(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
                <span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-07</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Controllers & Routing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-red-600" /></div><h4 className="font-display text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">NestJS Concept</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Controllers handle incoming HTTP requests and return responses. They use decorators like @Get, @Post, @Param, @Body to define routes declaratively.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express uses router.get/post functions. NestJS uses decorators on class methods. Same HTTP concepts, different syntax.</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Basic Controller</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')    // ← Base route prefix: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // GET /users/search?name=mehedi&role=admin
  @Get('search')
  search(
    @Query('name') name: string,
    @Query('role') role: string,
  ) {
    return this.usersService.search(name, role);
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);  // +id converts string to number
  }

  // POST /users
  @Post()
  @HttpCode(HttpStatus.CREATED)   // ← Returns 201 instead of default 200
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // PUT /users/:id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)  // ← Returns 204
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Request Decorators Cheat Sheet</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Decorator</th>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Express Equivalent</th>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@Body()</td><td className="px-4 py-3 font-mono text-slate-500">req.body</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Request body (POST/PUT data)</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@Param(&apos;id&apos;)</td><td className="px-4 py-3 font-mono text-slate-500">req.params.id</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Route parameter</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@Query(&apos;page&apos;)</td><td className="px-4 py-3 font-mono text-slate-500">req.query.page</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Query string parameter</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@Headers(&apos;auth&apos;)</td><td className="px-4 py-3 font-mono text-slate-500">req.headers.auth</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Request header</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@Ip()</td><td className="px-4 py-3 font-mono text-slate-500">req.ip</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Client IP address</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@Req()</td><td className="px-4 py-3 font-mono text-slate-500">req</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Full request object (avoid if possible)</td></tr>
                <tr className="bg-white dark:bg-slate-900/50"><td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">@Res()</td><td className="px-4 py-3 font-mono text-slate-500">res</td><td className="px-4 py-3 text-slate-600 dark:text-slate-400">Full response object (avoid if possible)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Express vs NestJS — Route Handling</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`router.get('/', (req, res) => {
  const users = getUsers();
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = getUser(id);
  if (!user) {
    return res.status(404).json({
      message: 'Not found'
    });
  }
  res.json(user);
});

router.post('/', (req, res) => {
  const user = createUser(req.body);
  res.status(201).json(user);
});`}
              </pre>
            </div>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS</h3>
              <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                {`@Get()
findAll() {
  return this.usersService.findAll();
  // Auto-serialized to JSON
  // Auto 200 status
}

@Get(':id')
findOne(@Param('id') id: string) {
  const user = this.usersService.findOne(+id);
  if (!user) {
    throw new NotFoundException();
    // Auto 404 with proper format
  }
  return user;
}

@Post()
@HttpCode(201)
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
  // dto is auto-validated (with pipes)
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">TasksController</code> with full CRUD endpoints</li>
            <li>Use @Param for task ID, @Body for create/update, @Query for filtering</li>
            <li>Add a <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">GET /tasks/stats</code> route that returns task counts</li>
            <li>Test all endpoints with Postman or curl</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-red-900 dark:text-red-400">⚠️ Common Mistakes</h3>
          <ul className="text-red-800 dark:text-red-300 text-sm space-y-2 list-disc pl-5">
            <li>Putting business logic in controllers — keep them thin, delegate to services.</li>
            <li>Using @Res() directly — it breaks NestJS's automatic response handling and interceptors.</li>
            <li>Route order matters: <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">/users/search</code> must come BEFORE <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">/users/:id</code> or "search" matches as an id.</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">
            Move to <Link href="/learn/nestjs/nj08-services" className="font-bold underline hover:text-emerald-600">NJ-08 — Providers & Services</Link> to learn where all the business logic lives.
          </p>
        </section>
      </div>
    </>
  );
}

