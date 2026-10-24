# LearnCraft NestJS Curriculum

## Learning goal

Learn the core ideas behind NestJS so you can read code, understand how a request moves through an application, build features with AI's help, spot common mistakes, and explain important concepts in interviews. You do not need to memorize every NestJS feature.

**Teaching rule:** Easy topics stay short. Moderate topics get a clear explanation and example. Difficult topics are explained step by step. Every lesson includes a scenario question and a simple model answer. Interview questions appear only for important topics.

**Scope:** This track focuses on NestJS. It includes only the TypeScript basics needed to understand NestJS. Database systems, ORMs, Docker, deployment, and other separate courses are outside this curriculum.

---

# Part 1: Understand the NestJS Structure

## Lesson 1: What Is NestJS?

**Difficulty: Easy**

NestJS is a framework for building server-side applications with Node.js. It gives your code a clear structure using modules, controllers, and providers (often services).

A client sends a request, NestJS finds the controller that handles it, and the application sends a response.

```ts
import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Controller()
class AppController {
  @Get('hello')
  sayHello() {
    return { message: 'Hello from NestJS' };
  }
}

@Module({ controllers: [AppController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```

### How the example works
1. `@Controller()` marks a class that handles requests.
2. `@Get('hello')` connects a GET request to `/hello` to `sayHello()`.
3. The method returns an object. NestJS sends it as a response.
4. `AppModule` registers the controller so NestJS can use it.
5. `bootstrap()` starts the server on port `3000`.

This is a small teaching example. A real project usually keeps these classes in separate files and uses the generated NestJS project structure.

**Scenario question:** You need an endpoint that returns a welcome message. Which part should handle the HTTP request?

**Simple answer:** A controller should handle the request and return the response. For a larger feature, it can call a service to do the work.

---

## Lesson 2: TypeScript Basics You Need for NestJS

**Difficulty: Easy**

You do not need to study all of TypeScript again here. These basics appear often in NestJS code:

- **Class:** a structure used to create an object or organize code.
- **Type annotation:** tells TypeScript what kind of value is expected.
- **`async`/`await`:** helps work with tasks that finish later.
- **Decorator:** code such as `@Controller()` that gives NestJS information about a class or method.

```ts
class User {
  constructor(public name: string) {}
}

async function getUserName(): Promise<string> {
  return 'Rina';
}
```

### How the example works
1. `class User` defines a class.
2. `name: string` says `name` should be text.
3. `async` means the function returns a Promise.
4. `Promise<string>` means the Promise will provide a string when it succeeds.

Learn the TypeScript basics required by each lesson. Do not pause the NestJS course to study unrelated advanced TypeScript features.

**Scenario question:** You see `name: string` in a NestJS class. What does it tell you?

**Simple answer:** It tells TypeScript that `name` should contain text, helping catch type mistakes while writing or checking the code.

---

## Lesson 3: Project Structure and `main.ts`

**Difficulty: Moderate**

A standard NestJS project starts in `main.ts`. That file creates the NestJS application and starts the server. `AppModule` is the root module that connects the application's main parts.

```ts
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

### How the example works
1. `NestFactory.create(AppModule)` creates the NestJS app using the root module.
2. `await` waits for the app to be created.
3. `app.listen(...)` starts the server on the configured port, or `3000` if no port was set.
4. `bootstrap()` runs the startup function.

You usually do not need to change `main.ts` for every feature. You may change it to set up global validation, a global prefix, or other app-wide behavior.

**Scenario question:** Your controller and service are written, but the application never starts. Which file should you check first for startup setup?

**Simple answer:** Check `main.ts` and confirm it creates the app with the correct root module and calls `app.listen()`.

---

## Lesson 4: Modules

**Difficulty: Moderate**

A module groups related parts of an application. For example, a `UsersModule` can group user controllers and user services. Modules help keep a growing project organized.

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

### How the example works
1. `@Module()` gives NestJS the module's setup information.
2. `controllers` lists the controllers handled by this module.
3. `providers` lists services and other providers NestJS should create and manage.
4. `UsersModule` must be imported by another module, often `AppModule`, for the app to use it.

A module can also import another module and export providers that other modules need. Learn `imports` and `exports` when a feature needs to share a service; do not expose every provider by default.

**Scenario question:** Your application has users, courses, and payments. Why might you create a separate module for each feature?

**Simple answer:** Each module keeps closely related code together, making the project easier to understand and change.

**Interview question:** What is a NestJS module?

**Simple answer:** A module groups controllers and providers that belong to a feature and tells NestJS how those parts connect.

---

# Part 2: Handle Requests and Organize Logic

## Lesson 5: Controllers

**Difficulty: Easy**

A controller receives HTTP requests and decides which method should handle them. It should usually pass business work to a service instead of doing everything itself.

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll() {
    return ['JavaScript', 'TypeScript', 'NestJS'];
  }
}
```

### How the example works
1. `@Controller('courses')` sets the route prefix to `/courses`.
2. `@Get()` handles a GET request to `/courses`.
3. `findAll()` returns the course names.
4. NestJS converts the returned value into an HTTP response.

**Scenario question:** A controller contains 200 lines of business rules. What is a useful improvement?

**Simple answer:** Move most of the business rules into a service. Keep the controller focused on handling the request and returning the result.

---

## Lesson 6: Routes and HTTP Methods

**Difficulty: Easy**

A route connects an HTTP method and a URL to a controller method. The HTTP method tells the server what kind of action the client wants to perform.

```ts
@Controller('courses')
export class CoursesController {
  @Get()
  findAll() {
    return 'Get all courses';
  }

  @Get(':id')
  findOne() {
    return 'Get one course';
  }

  @Post()
  create() {
    return 'Create a course';
  }
}
```

### How the example works
- `GET /courses` is used to read the course list.
- `GET /courses/12` matches the `:id` route.
- `POST /courses` is commonly used to submit data to create a course.

The strings are placeholders for this lesson; a real controller would read the ID or request body and call a service.

**Scenario question:** The browser needs to retrieve all courses, not create one. Which method would normally fit?

**Simple answer:** `GET`, because the request is asking to read data.

---

## Lesson 7: Route Parameters, Query Parameters, and Request Bodies

**Difficulty: Moderate**

These are three common ways for a request to send information:

- **Route parameter:** part of the URL path, often used to identify one item.
- **Query parameter:** extra information after `?`, often used for search or filtering.
- **Request body:** data sent with a request, often when creating or updating something.

```ts
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get(':id')
  findOne(@Param('id') id: string, @Query('view') view?: string) {
    return { id, view: view ?? 'full' };
  }

  @Post()
  create(@Body() body: { title: string }) {
    return { message: `Received ${body.title}` };
  }
}
```

### How the example works
1. `/courses/12?view=short` matches `findOne()`.
2. `@Param('id')` reads `12` from the path. Route values arrive as strings unless you transform them.
3. `@Query('view')` reads `short` from the query string.
4. `@Body()` reads the submitted body. This example shows the shape for learning; real request data should be validated with a DTO and validation pipe.

**Scenario question:** You need `/courses/12` to identify a course and `?view=short` to choose how much detail to show. Which values should you read?

**Simple answer:** Read `12` with `@Param('id')` and `short` with `@Query('view')`.

---

## Lesson 8: Providers and Services

**Difficulty: Easy**

A provider is a class NestJS can create and supply when another class needs it. A service is a common kind of provider. Services often contain business logic or work with data.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  findAll() {
    return ['JavaScript', 'TypeScript'];
  }
}
```

### How the example works
1. `@Injectable()` marks the class so NestJS can manage it as a provider.
2. `findAll()` contains the work for getting courses.
3. A controller can ask NestJS to provide this service rather than creating it manually.

**Scenario question:** Both the website and an admin route need the same course-list logic. Where should that shared logic usually live?

**Simple answer:** Put it in a service so both controllers can use the same code.

---

## Lesson 9: Dependency Injection

**Difficulty: Difficult**

Dependency injection (DI) means NestJS provides a class with the other objects it needs. You do not have to create each service yourself in every controller.

```ts
import { Controller, Get, Injectable, Module } from '@nestjs/common';

@Injectable()
class CoursesService {
  findAll() {
    return ['React', 'NestJS'];
  }
}

@Controller('courses')
class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
}

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
})
class CoursesModule {}
```

### Understand it step by step
1. `CoursesService` contains the course-list logic.
2. The module registers `CoursesService` in `providers`.
3. The controller asks for `CoursesService` in its constructor.
4. NestJS finds the registered provider and supplies an instance.
5. The controller calls `this.coursesService.findAll()`.

`private readonly` is TypeScript syntax that stores the constructor value as a class property. `readonly` means this property should not be reassigned in this class. NestJS handles providing the service instance.

**Why it matters:** It keeps classes separate and makes services easier to replace during tests.

**Scenario question:** NestJS reports that it cannot resolve `CoursesService` in a controller. What should you check?

**Simple answer:** Check that the service is listed in the right module's `providers` array and that the module is imported correctly if the service belongs to another module.

**Interview question:** What is dependency injection?

**Simple answer:** It is a way for NestJS to supply a class with the dependencies it needs instead of the class creating them itself.

---

## Lesson 10: Decorators

**Difficulty: Moderate**

Decorators such as `@Controller()`, `@Get()`, and `@Injectable()` give NestJS information about your classes or methods. NestJS uses that information to connect routes and manage providers.

```ts
@Controller('courses')
export class CoursesController {
  @Get()
  findAll() {
    return ['React', 'NestJS'];
  }
}
```

### How the example works
1. `@Controller('courses')` tells NestJS the controller's route prefix.
2. `@Get()` tells NestJS to use `findAll()` for a GET request at that prefix.
3. NestJS reads this setup when building the app.

You do not need to learn how decorators work internally at first. Learn what the common NestJS decorators tell the framework to do.

**Scenario question:** You see `@Post()` above a controller method. What does it tell you?

**Simple answer:** The method handles a POST request for the route defined by the controller and any route path on the decorator.

---

# Part 3: Check Inputs and Handle Errors

## Lesson 11: DTOs (Data Transfer Objects)

**Difficulty: Moderate**

A DTO describes the shape of data that enters or leaves a part of your application. In NestJS, DTOs are often classes used to describe request bodies and apply validation rules.

```ts
export class CreateCourseDto {
  title!: string;
  description!: string;
}
```

A controller can use it like this:

```ts
@Post()
create(@Body() body: CreateCourseDto) {
  return { message: `Course received: ${body.title}` };
}
```

### What this does—and does not do
1. `CreateCourseDto` describes the expected fields.
2. `@Body()` reads the incoming request body.
3. `CreateCourseDto` makes the expected shape clearer to developers and TypeScript.
4. **A type annotation alone does not check incoming JSON at runtime.** Add validation decorators and a `ValidationPipe` to check real request data.

**Scenario question:** Your endpoint expects a course title and description. Why create a DTO instead of accepting an unexplained object?

**Simple answer:** The DTO clearly describes the expected data and provides a place to define validation rules.

---

## Lesson 12: Validation and Pipes

**Difficulty: Difficult**

A pipe runs before the controller method. Pipes can transform an input or check it. A `ValidationPipe` can check incoming data against validation rules on a DTO.

Install the packages if they are not already installed in the project:

```bash
npm install class-validator class-transformer
```

Create a DTO:

```ts
import { IsString, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MinLength(3)
  title!: string;
}
```

Enable validation in `main.ts`:

```ts
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
}));
```

### Understand it step by step
1. The client sends a request with a `title`.
2. `ValidationPipe` checks the request body using the DTO's validation rules.
3. `@IsString()` requires the title to be a string.
4. `@MinLength(3)` requires at least three characters.
5. If the input fails validation, NestJS returns an error instead of calling the controller method with invalid input.
6. `whitelist: true` removes properties that have no validation decorators. `transform: true` enables transformation of incoming values to the expected DTO type where supported.

The `app` variable in the `main.ts` snippet is the application created by `NestFactory`. Place this configuration after creating the app and before `app.listen()`.

**Scenario question:** A user sends an empty course title, but it must have at least three characters. Where should this rule be checked?

**Simple answer:** Add `@MinLength(3)` to the DTO property and enable a `ValidationPipe` so NestJS checks the request before it reaches the controller.

**Interview question:** What is the purpose of a pipe in NestJS?

**Simple answer:** A pipe can check or transform input before the controller method handles the request.

---

## Lesson 13: Handling Errors

**Difficulty: Moderate**

When a request cannot be completed, return a suitable HTTP error instead of pretending it succeeded. NestJS provides built-in exceptions such as `NotFoundException` and `BadRequestException`.

```ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CoursesService {
  findOne(id: string) {
    // Demo data: only course 1 exists in this example.
    const course = id === '1' ? { id, title: 'React basics' } : undefined;

    if (!course) {
      throw new NotFoundException(`Course ${id} was not found`);
    }

    return course;
  }
}
```

### How the example works
1. The service tries to find the course. The `undefined` value is only a placeholder for this lesson.
2. If no course exists, it throws `NotFoundException`.
3. NestJS turns this built-in exception into an HTTP 404 response.
4. The request does not continue as if a course had been found.

Use `BadRequestException` for invalid request data, `UnauthorizedException` when authentication is missing or invalid, and `ForbiddenException` when the user is signed in but lacks permission. Don't expose secrets or internal stack traces in user-facing error messages.

**Scenario question:** A client requests course ID `99`, but no such course exists. What response should the service cause?

**Simple answer:** A 404 Not Found response, for example by throwing `NotFoundException`.

---

# Part 4: Control the Request Process

## Lesson 14: Middleware

**Difficulty: Moderate**

Middleware runs early in the request process, before the controller method. It is useful for work that applies broadly, such as logging that a request arrived.

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}
```

### How the example works
1. A request arrives.
2. `use()` logs its HTTP method and URL.
3. `next()` allows the request to continue to the next middleware or handling stage.
4. Without calling `next()` or sending a response, this middleware would leave the request waiting.

This example uses the Express request types. NestJS can also run with Fastify, which uses different underlying request and response types; check the adapter used by the project.

**Scenario question:** You want to log the URL of incoming requests before controllers handle them. Which NestJS feature can help?

**Simple answer:** Middleware, because it runs early and can inspect the incoming request.

---

## Lesson 15: Guards and Route Protection

**Difficulty: Difficult**

A guard decides whether a request is allowed to continue to a route. Guards are often used for authentication checks and permissions.

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ExampleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers['x-demo-access'] === 'allowed';
  }
}
```

Use it on a route:

```ts
@UseGuards(ExampleGuard)
@Get('private')
getPrivateInfo() {
  return { message: 'Access granted' };
}
```

### Understand it step by step
1. NestJS runs the guard before the route handler.
2. The guard gets access to the HTTP request through `ExecutionContext`.
3. It checks a request header for this teaching example.
4. Returning `true` allows the request to continue; returning `false` denies access.

**Important:** This header check is only a demonstration of how a guard works. It is not real authentication and must not protect sensitive data in a production app. A real guard should verify the project's trusted authentication information and permissions.

**Scenario question:** Only signed-in users should open a private endpoint. Which feature can check the request before the controller method runs?

**Simple answer:** A guard can check whether the request is authenticated and allow it only when the check passes.

**Interview question:** What is the main job of a guard?

**Simple answer:** A guard decides whether a request can continue to the route handler, often based on identity or permissions.

---

## Lesson 16: Interceptors

**Difficulty: Moderate**

An interceptor can run code before and after a controller method. It is useful for shared tasks such as measuring response time or changing the shape of returned data.

```ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => console.log(`Took ${Date.now() - startedAt}ms`)),
    );
  }
}
```

### How the example works
1. `startedAt` records the start time before the route handler finishes.
2. `next.handle()` lets the controller handler run.
3. `tap()` runs when the returned stream emits a value.
4. The log shows how long it took until the handler's result was emitted.

This is a simple timing example, not a full performance-monitoring system. Interceptors can do more, but learn their basic purpose first.

**Scenario question:** You want to measure how long controller handlers take without adding timing code to every controller. What could you use?

**Simple answer:** An interceptor can share that timing logic across selected routes.

---

## Lesson 17: The Request Lifecycle

**Difficulty: Difficult**

The request lifecycle is the order NestJS uses to handle a request. Knowing the main order helps you understand why a request was blocked, changed, or failed before it reached a controller.

A simplified HTTP request generally follows this path:

1. **Middleware** runs early and can inspect the request.
2. **Guards** decide whether the request can continue.
3. **Interceptors** run before the controller handler.
4. **Pipes** validate or transform route inputs.
5. **Controller and service** handle the request.
6. **Interceptors** can run again as the result returns.
7. If an uncaught error occurs, **exception filters** can format the error response.

The exact order can include global, module, controller, and route-level components. This lesson covers the main idea; consult the official lifecycle guide when debugging a complex combination.

**Scenario question:** A guard rejects a request. Will the controller method normally run?

**Simple answer:** No. The guard stops the request before it reaches the controller method.

**Interview question:** What is the usual high-level order of middleware, guards, interceptors, and pipes?

**Simple answer:** Middleware runs first, then guards, then the pre-handler part of interceptors, then pipes, and then the controller handler. Interceptors also run on the way back with the result.

---

# Part 5: Authentication, Testing, and Good Structure

## Lesson 18: Authentication vs. Authorization

**Difficulty: Moderate**

**Authentication** answers, “Who are you?” **Authorization** answers, “Are you allowed to do this?” They solve different problems and are often used together.

For example:
- Authentication checks that a request belongs to a signed-in user.
- Authorization checks whether that user has permission to delete a course.
- A guard can use the verified user and permission information to allow or deny a request.

Do not treat a user-supplied header or body field as proof of identity. Authentication must rely on a trusted verification process. Authorization should be checked on the server for the specific action or resource.

**Scenario question:** A user is signed in but tries to delete a course that only admins can delete. What must the application check?

**Simple answer:** Authentication confirms who the user is. Authorization must check whether that user has admin permission to delete the course.

**Interview question:** What is the difference between authentication and authorization?

**Simple answer:** Authentication checks who the user is; authorization checks what that user is allowed to do.

---

## Lesson 19: Testing a NestJS Service

**Difficulty: Moderate**

A test checks that code behaves as expected. Unit tests can check a service without starting the whole application. NestJS provides testing utilities to create a small testing module.

Example service:

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class GreetingService {
  greet(name: string) {
    return `Hello, ${name}`;
  }
}
```

Example unit test using Jest, as in a standard NestJS starter project:

```ts
import { Test } from '@nestjs/testing';
import { GreetingService } from './greeting.service';

describe('GreetingService', () => {
  it('greets the supplied name', async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GreetingService],
    }).compile();

    const service = moduleRef.get(GreetingService);
    expect(service.greet('Rina')).toBe('Hello, Rina');
  });
});
```

### How the test works
1. `createTestingModule()` builds a small NestJS testing module with the service.
2. `compile()` prepares the module.
3. `moduleRef.get()` retrieves the service instance.
4. `expect(...).toBe(...)` checks that the returned message matches the expected result.

If your project uses a different test runner, follow its setup instead of adding Jest just for this lesson.

**Scenario question:** You changed a service and want to check that it still returns the right message. What is a simple test you can write?

**Simple answer:** Call the service with a known name and check that the returned text is exactly what you expect.

---

## Lesson 20: Organize a Feature and Debug Common Problems

**Difficulty: Moderate**

A common NestJS pattern is to keep each feature's controller, service, DTOs, and module close together. The controller handles the request, the service contains the main work, DTOs describe incoming data, and the module connects the parts.

A simple feature might look like this:

```text
src/
  courses/
    courses.module.ts
    courses.controller.ts
    courses.service.ts
    dto/
      create-course.dto.ts
  app.module.ts
  main.ts
```

Not every project needs exactly this folder layout. Use the structure already used by your team unless there is a clear reason to change it.

### A simple debugging checklist
1. **Route not found:** check the controller prefix, route decorator, HTTP method, and module registration.
2. **Provider cannot be resolved:** check the module's `providers`, `imports`, and `exports`.
3. **Request body is not valid:** check the DTO, validation decorators, and whether a `ValidationPipe` is enabled.
4. **Request is blocked:** check guards and their conditions.
5. **Unexpected server error:** inspect the server logs and the relevant service method without exposing private information to users.

**Scenario question:** NestJS says it cannot resolve a service used by a controller. What should you check first?

**Simple answer:** Check that the service is registered in a module's `providers` array and that the module imports and exports are correct if the service is shared across modules.

---

# What this curriculum intentionally leaves out

This core track does not teach databases, SQL, Prisma, Docker, deployment, or a complete authentication-provider setup. Those belong in separate tracks. It also does not attempt to cover every advanced NestJS feature, such as dynamic modules, custom injection tokens, request-scoped providers, microservices, queues, or WebSockets. Learn these later when a real project requires them.

# Official references

Use these official guides when a learner needs more detail:

- [NestJS first steps](https://docs.nestjs.com/first-steps)
- [Controllers](https://docs.nestjs.com/controllers)
- [Providers and dependency injection](https://docs.nestjs.com/providers)
- [Modules](https://docs.nestjs.com/modules)
- [Pipes and validation](https://docs.nestjs.com/pipes)
- [Validation](https://docs.nestjs.com/techniques/validation)
- [Middleware](https://docs.nestjs.com/middleware)
- [Guards](https://docs.nestjs.com/guards)
- [Interceptors](https://docs.nestjs.com/interceptors)
- [Exception filters](https://docs.nestjs.com/exception-filters)
- [Request lifecycle](https://docs.nestjs.com/faq/request-lifecycle)
- [Testing](https://docs.nestjs.com/fundamentals/testing)
