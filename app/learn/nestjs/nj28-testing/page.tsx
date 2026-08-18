/**
 * NJ-19 — Testing Strategies
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ19Testing(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"><span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-19</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Testing Strategies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div><h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS has built-in testing support with @nestjs/testing. It provides Test.createTestingModule() to create isolated modules with mock providers for unit and integration tests.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express testing requires manual setup of mocks and test servers. NestJS provides a testing module that mirrors the DI container for easy mocking.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Unit Testing Services</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  // ✅ Mock repository
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,   // Inject mock instead of real DB
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', async () => {
    const users = [{ id: 1, name: 'Mehedi' }];
    mockRepository.find.mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should create a user', async () => {
    const dto = { name: 'Mehedi', email: 'm@e.com', password: 'hashed' };
    const user = { id: 1, ...dto };

    mockRepository.create.mockReturnValue(user);
    mockRepository.save.mockResolvedValue(user);

    const result = await service.create(dto);
    expect(result).toEqual(user);
    expect(mockRepository.save).toHaveBeenCalledWith(user);
  });

  it('should throw NotFoundException for unknown user', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Unit Testing Controllers</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test' }),
    create: jest.fn().mockImplementation(dto => ({ id: 1, ...dto })),
    update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should return all users', async () => {
    expect(await controller.findAll()).toHaveLength(1);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should create a user', async () => {
    const dto = { name: 'New User', email: 'new@test.com', password: '12345678' };
    const result = await controller.create(dto);
    expect(result.name).toBe('New User');
  });
});`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. E2E Testing</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /users → 200', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('POST /users → 201', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Test', email: 'test@e2e.com', password: '12345678' })
      .expect(201)
      .expect(res => {
        expect(res.body.name).toBe('Test');
        expect(res.body.email).toBe('test@e2e.com');
      });
  });

  it('POST /users with invalid data → 400', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: '' })    // Missing email and password
      .expect(400);
  });
});

// Run: npm run test:e2e`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Write unit tests for your TasksService with mock repository</li>
            <li>Write controller tests that mock the service layer</li>
            <li>Write an e2e test for the full auth flow: register → login → access protected route</li>
            <li>Aim for 80%+ code coverage: <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">npm run test -- --coverage</code></li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj20-folder-structure" className="font-bold underline hover:text-emerald-600">NJ-20 — Scalable Folder Structure</Link> to organize your project for production.</p>
        </section>
      </div>
    </>
  );
}

