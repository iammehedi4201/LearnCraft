import { InterviewQuestion } from "@/types/interview";

export const NESTJS_QUESTIONS: InterviewQuestion[] = [
  {
    id: "nest-q01",
    trackKey: "nestjs",
    category: "Architecture & Dependency Injection",
    subtopic: "Request Lifecycle",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Explain the NestJS Request Lifecycle: Middleware vs Guards vs Interceptors vs Pipes vs Exception Filters.",
    answer: `### Simple answer:
NestJS processes incoming HTTP requests through a predictable, structured pipeline where each layer has a distinct responsibility:

### Execution Order:
\`\`\`
Incoming Request
  ↳ 1. Global Middleware → Module Middleware
  ↳ 2. Global Guards → Controller Guards → Route Guards
  ↳ 3. Global Interceptors (Pre-Controller logic)
  ↳ 4. Global Pipes → Controller Pipes → Route Pipes → Param Pipes
  ↳ 5. Controller Route Handler Method
  ↳ 6. Service / Business Logic Execution
  ↳ 7. Global Interceptors (Post-Controller / Transform Response)
  ↳ 8. Exception Filters (Catch errors thrown anywhere in the pipeline)
Response Sent
\`\`\`

### Purpose of Each Layer:
- **Middleware:** Executes general HTTP tasks (CORS, logging, session cookies) before routing decisions.
- **Guards:** Determines whether the request is **authorized** (returns boolean or throws 403 Forbidden).
- **Interceptors:** Binds logic before and after handler execution; transforms output or handles caching/timeouts.
- **Pipes:** **Validates and transforms** input parameters (e.g. \`ValidationPipe\` with \`class-validator\`).
- **Exception Filters:** Formats and serializes error responses into clean, consistent JSON.

### Interview answer:
The NestJS request pipeline executes in order: Middleware -> Guards (authorization) -> Interceptors (pre-handler) -> Pipes (validation and transformation) -> Controller Handler -> Interceptors (post-handler transformation) -> Exception Filters (error catching). This separation of concerns keeps enterprise applications organized and maintainable.`,
    followUps: [
      "Why should authentication checks be placed in Guards rather than Middleware in NestJS?",
      "What are Provider Scopes in NestJS (DEFAULT, REQUEST, TRANSIENT) and how does REQUEST scope impact performance?",
      "How does Dependency Injection use TypeScript reflection metadata (reflect-metadata) under the hood?"
    ],
    keyPoints: [
      "Request pipeline order: Middleware → Guards → Interceptors → Pipes → Handler → Interceptors → Filters",
      "Guards handle authorization before payload validation pipes execute",
      "Pipes validate and transform DTO inputs",
      "Exception filters catch and serialize uncaught exceptions"
    ],
    tags: ["nestjs", "dependency-injection", "guards", "interceptors", "lifecycle"],
    relatedLessonSlug: "/learn/nestjs/nest03-guards-interceptors-pipes",
    relatedLessonName: "NEST-03: Guards, Interceptors & Pipes Pipeline"
  },
  {
    id: "nest-q02",
    trackKey: "nestjs",
    category: "Fundamentals",
    subtopic: "Why NestJS",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is NestJS, and why is it popular for enterprise Node.js backend development?",
    answer: `### Simple answer:
NestJS is an enterprise-grade TypeScript backend framework inspired by Angular. While vanilla Express gives you total freedom (which often leads to chaotic spaghetti code in large teams), NestJS provides an **opinionated, modular architecture** out of the box.

### Key Advantages:
1. **Opinionated Architecture:** Defines clear conventions for structuring code into Modules, Controllers, and Services.
2. **First-Class TypeScript:** Built from the ground up in strict TypeScript with decorators.
3. **Built-in Dependency Injection (IoC):** Classes receive dependencies automatically, making unit testing with mocks effortless.
4. **Underlying HTTP Flexibility:** Runs on Express by default, but can be switched to **Fastify** with one line for extreme throughput.
5. **Ecosystem Integration:** First-class packages for Microservices, WebSockets, GraphQL, OpenAPI/Swagger, and BullMQ queues.

### Interview answer:
NestJS is an opinionated, modular TypeScript framework for building scalable enterprise server-side applications. It solves Node's lack of standardized architectural patterns by offering built-in Dependency Injection, modular organization, and seamless integration with testing, Swagger documentation, and microservices.`,
    followUps: [
      "How does switching from the default Express platform to Fastify improve performance in NestJS?",
      "How does NestJS leverage TypeScript decorators under the hood?",
      "How does NestJS compare to Spring Boot (Java) or ASP.NET Core (C#)?"
    ],
    keyPoints: [
      "Opinionated, modular architecture inspired by Angular",
      "Built-in Dependency Injection and Inversion of Control",
      "First-class TypeScript support with decorators",
      "Pluggable HTTP adapter supporting both Express and Fastify"
    ],
    tags: ["nestjs", "enterprise", "typescript", "architecture", "fastify"],
    relatedLessonSlug: "/learn/nestjs/nest01-what-is-nestjs",
    relatedLessonName: "NEST-01: What is NestJS & Enterprise Architecture"
  },
  {
    id: "nest-q03",
    trackKey: "nestjs",
    category: "Core Architecture",
    subtopic: "Modules Controllers Providers",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "Explain the three core building blocks of NestJS: Modules, Controllers, and Providers.",
    answer: `### Simple answer:
Every NestJS application is organized around three foundational constructs:

1. **Modules (\`@Module\`):**
   - The organizational boundary of your code. Groups related controllers and providers into cohesive domain features (e.g. \`UsersModule\`, \`AuthModule\`).
   - Declares \`controllers\`, \`providers\`, \`imports\`, and \`exports\`.

2. **Controllers (\`@Controller\`):**
   - Handles incoming HTTP requests and returns responses to the client.
   - Defines route paths and HTTP methods (\`@Get()\`, \`@Post()\`, \`@Put()\`).
   - Delegates business logic to services.

3. **Providers / Services (\`@Injectable\`):**
   - Houses the actual business logic, database queries, and third-party API interactions.
   - Injected into controllers or other providers via Dependency Injection.

### Example:
\`\`\`typescript
// 1. Service (Provider):
@Injectable()
export class UsersService {
  findAll() { return ["Alice", "Bob"]; }
}

// 2. Controller:
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() { return this.usersService.findAll(); }
}

// 3. Module:
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // allows other modules to use UsersService!
})
export class UsersModule {}
\`\`\`

### Interview answer:
NestJS structures applications into Modules, Controllers, and Providers. Modules define feature boundaries and manage dependencies, Controllers handle incoming HTTP requests and routing, and Providers (Services) encapsulate business logic and database access, injected via Dependency Injection.`,
    followUps: [
      "Why must a service be listed in the `exports` array if another module needs to inject it?",
      "What is the Root Module (AppModule) in a NestJS application?",
      "Can a Controller be injected into a Service?"
    ],
    keyPoints: [
      "@Module organizes feature domains and declares imports/exports",
      "@Controller defines route endpoints and handles HTTP requests",
      "@Injectable Providers encapsulate business logic",
      "Controllers should remain thin, delegating work to Services"
    ],
    tags: ["modules", "controllers", "providers", "nestjs-basics"],
    relatedLessonSlug: "/learn/nestjs/nest02-modules-controllers-providers",
    relatedLessonName: "NEST-02: Modules, Controllers & Injectable Providers"
  },
  {
    id: "nest-q04",
    trackKey: "nestjs",
    category: "Architecture & Dependency Injection",
    subtopic: "Dependency Injection",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is Dependency Injection in NestJS, and how does constructor injection work?",
    answer: `### Simple answer:
Dependency Injection (DI) is a design pattern where a class receives its dependencies from an external container (the NestJS Inversion of Control container) rather than creating them directly with \`new ServiceName()\`.

### Why DI is powerful:
Without DI, classes are tightly coupled to specific implementations, making testing almost impossible. With DI:
- Classes declare what they need in their constructor.
- NestJS instantiates and injects the dependency automatically.
- During unit testing, you can effortlessly swap real database services for mock services!

### Example:
\`\`\`typescript
@Injectable()
export class OrdersService {
  findAll() { return [{ id: 1, total: 100 }]; }
}

@Controller("orders")
export class OrdersController {
  // Constructor Injection with TypeScript parameter properties:
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.findAll();
  }
}
\`\`\`

### How it works under the hood:
NestJS uses TypeScript's \`reflect-metadata\` library. When TypeScript compiles the constructor, it emits type metadata, allowing the NestJS IoC container to identify at runtime that \`OrdersController\` requires an instance of \`OrdersService\`.

### Interview answer:
Dependency Injection decouples classes from creating their own dependencies by having the NestJS IoC container instantiate and inject them via constructor parameters. This promotes loose coupling, reusable code, and simple unit testing through mock substitution.`,
    followUps: [
      "What is custom provider syntax using useClass, useValue, and useFactory?",
      "How do circular dependencies work in NestJS and how does forwardRef() resolve them?",
      "What is the Inversion of Control (IoC) principle?"
    ],
    keyPoints: [
      "Dependencies are injected via class constructors",
      "Decorated with @Injectable()",
      "Uses reflect-metadata to resolve dependency types at runtime",
      "Enables straightforward mock injection for unit tests"
    ],
    tags: ["dependency-injection", "ioc", "constructor-injection", "testing", "nestjs"],
    relatedLessonSlug: "/learn/nestjs/nest02-modules-controllers-providers",
    relatedLessonName: "NEST-02: Modules, Controllers & Injectable Providers"
  },
  {
    id: "nest-q05",
    trackKey: "nestjs",
    category: "Validation & DTOs",
    subtopic: "ValidationPipe",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is a DTO (Data Transfer Object), and how do you enforce input validation using `ValidationPipe` and `class-validator`?",
    answer: `### Simple answer:
A DTO (Data Transfer Object) is an object that defines how data will be sent over the network. In NestJS, DTOs are written as TypeScript classes decorated with validation rules from **\`class-validator\`**.

### Step 1: Define DTO with decorators:
\`\`\`typescript
import { IsString, IsEmail, MinLength, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
\`\`\`

### Step 2: Enable Global ValidationPipe in \`main.ts\`:
\`\`\`typescript
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away any extra properties not defined in the DTO!
      forbidNonWhitelisted: true, // Throws 400 Bad Request if extra fields are sent
      transform: true, // Automatically converts primitive query params (strings to numbers/booleans)
    })
  );

  await app.listen(3000);
}
\`\`\`

### Step 3: Use in Controller:
\`\`\`typescript
@Post()
create(@Body() dto: CreateUserDto) {
  // If request body fails validation, NestJS automatically returns HTTP 400 with detailed error messages!
  return this.usersService.create(dto);
}
\`\`\`

### Interview answer:
DTOs define the contract and validation schema for request payloads. In NestJS, we annotate DTO classes with \`class-validator\` decorators and enable \`ValidationPipe\` globally with \`whitelist: true\` to automatically validate incoming data and reject malformed requests with a 400 Bad Request error.`,
    followUps: [
      "Why are DTOs declared as classes rather than TypeScript interfaces in NestJS?",
      "What does the whitelist: true option in ValidationPipe prevent (mass assignment vulnerability)?",
      "How does class-transformer convert plain JSON into class instances?"
    ],
    keyPoints: [
      "DTOs define payload contracts using class-validator decorators",
      "ValidationPipe validates incoming payloads automatically before route handlers run",
      "Must be classes because interfaces are removed at runtime and have no metadata",
      "whitelist: true protects against mass assignment attacks by stripping unwhitelisted fields"
    ],
    tags: ["dto", "validation-pipe", "class-validator", "security", "input-validation"],
    relatedLessonSlug: "/learn/nestjs/nest03-guards-interceptors-pipes",
    relatedLessonName: "NEST-03: Guards, Interceptors & Pipes Pipeline"
  },
  {
    id: "nest-q06",
    trackKey: "nestjs",
    category: "Security & Authorization",
    subtopic: "Guards and RBAC",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do Guards implement Role-Based Access Control (RBAC) in NestJS using Custom Decorators and Reflection?",
    answer: `### Simple answer:
A Guard in NestJS determines whether a given request should be permitted to proceed based on permissions, roles, or tokens. It implements the \`CanActivate\` interface and returns \`true\` (allowed) or \`false\` (403 Forbidden).

### Implementing RBAC in 3 steps:

### 1. Custom Roles Decorator (Sets Metadata):
\`\`\`typescript
import { SetMetadata } from "@nestjs/common";
export const ROLES_KEY = "roles";
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
\`\`\`

### 2. Roles Guard (Reads Metadata via Reflector):
\`\`\`typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true; // No roles required

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
\`\`\`

### 3. Protecting Routes:
\`\`\`typescript
@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Post("delete-user")
  @Roles("admin", "superadmin")
  deleteUser() {
    return { success: true };
  }
}
\`\`\`

### Interview answer:
Guards handle authorization in NestJS by implementing \`CanActivate\`. For RBAC, we define a custom \`@Roles()\` decorator that sets metadata, and a \`RolesGuard\` that reads that metadata using \`Reflector\` to verify the authenticated user has the necessary roles before allowing handler execution.`,
    followUps: [
      "What is ExecutionContext in NestJS and how does it abstract HTTP, WebSockets, and Microservices?",
      "Why must Authentication guards run before Authorization (Roles) guards?",
      "How does Passport integration (@nestjs/passport) implement JwtAuthGuard?"
    ],
    keyPoints: [
      "Guards implement CanActivate and return boolean or Promise<boolean>",
      "Reflector reads metadata attached to route handlers or controller classes",
      "Throws 403 Forbidden automatically if canActivate returns false",
      "ExecutionContext provides a unified API across HTTP, Microservices, and WebSockets"
    ],
    tags: ["guards", "rbac", "authorization", "reflector", "security"],
    relatedLessonSlug: "/learn/nestjs/nest03-guards-interceptors-pipes",
    relatedLessonName: "NEST-03: Guards, Interceptors & Pipes Pipeline"
  },
  {
    id: "nest-q07",
    trackKey: "nestjs",
    category: "Error Handling & Filters",
    subtopic: "Exception Filters",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What are Exception Filters in NestJS, and how do you create a Global Exception Filter to standardize error responses?",
    answer: `### Simple answer:
NestJS has a built-in global exceptions layer that catches all unhandled exceptions. An **Exception Filter** lets you take full control over how error responses are formatted, logged, and returned to client applications.

### Creating a Global Exception Filter:
\`\`\`typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch() // Empty @Catch() catches ALL errors, including non-HTTP crashes
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : "Internal server error";

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: typeof message === "object" ? message : { message },
    });
  }
}
\`\`\`

### Registering Globally in \`main.ts\`:
\`\`\`typescript
app.useGlobalFilters(new GlobalHttpExceptionFilter());
\`\`\`

### Interview answer:
Exception Filters catch uncaught exceptions and format standard HTTP error responses. By implementing the \`ExceptionFilter\` interface with \`@Catch()\`, we capture all thrown errors and serialize them into a unified JSON structure containing status codes, timestamps, and request paths.`,
    followUps: [
      "What is ArgumentsHost and how does host.switchToHttp() work?",
      "What are built-in NestJS HTTP exceptions like BadRequestException, NotFoundException, and UnauthorizedException?",
      "How do you catch database-specific exceptions (like Prisma.PrismaClientKnownRequestError)?"
    ],
    keyPoints: [
      "Filters catch uncaught exceptions anywhere in the pipeline",
      "Decorated with @Catch() to catch specific or all exceptions",
      "Standardizes error response JSON across the entire organization",
      "ArgumentsHost abstracts response object access"
    ],
    tags: ["exception-filters", "error-handling", "http-exception", "nestjs"],
    relatedLessonSlug: "/learn/nestjs/nest03-guards-interceptors-pipes",
    relatedLessonName: "NEST-03: Guards, Interceptors & Pipes Pipeline"
  },
  {
    id: "nest-q08",
    trackKey: "nestjs",
    category: "Interceptors & Observables",
    subtopic: "Interceptors",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What are Interceptors in NestJS, and how do they use RxJS Observables to transform responses and log request durations?",
    answer: `### Simple answer:
Interceptors are inspired by Aspect-Oriented Programming (AOP). They wrap the execution of route handlers, allowing you to run code **before** the handler executes and **after** it returns, using RxJS Observables.

### Common Capabilities:
1. Bind extra logic before/after method execution.
2. Transform the returned result (e.g. wrap everything in \`{ success: true, data: ... }\`).
3. Transform exceptions or map them to new errors.
4. Measure execution time (performance logging).
5. Cache responses or enforce request timeouts.

### Example: Logging and Response Transform Interceptor:
\`\`\`typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

@Injectable()
export class LoggingTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    // next.handle() invokes the actual route handler!
    return next.handle().pipe(
      tap(() => {
        console.log(\`[\${req.method}] \${req.url} completed in \${Date.now() - now}ms\`);
      }),
      map((data) => ({
        success: true,
        data, // wraps raw return value in standard response envelope
      }))
    );
  }
}
\`\`\`

### Interview answer:
Interceptors wrap route handler execution using RxJS Observables. They allow intercepting calls before the controller executes and manipulating the response stream afterward, making them ideal for performance profiling, standardized API response envelopes, caching, and request timeouts.`,
    followUps: [
      "How does RxJS timeout operator inside an interceptor enforce request execution time limits?",
      "What is ClassSerializerInterceptor and how does @Exclude() omit passwords from JSON responses?",
      "What is the difference between Interceptors and Middleware?"
    ],
    keyPoints: [
      "Wrap route execution using RxJS Observable streams (next.handle())",
      "Execute logic before and after route handler invocation",
      "Ideal for response envelope formatting ({ success: true, data })",
      "Can measure latency and enforce timeouts via RxJS operators"
    ],
    tags: ["interceptors", "rxjs", "observables", "logging", "transformation"],
    relatedLessonSlug: "/learn/nestjs/nest03-guards-interceptors-pipes",
    relatedLessonName: "NEST-03: Guards, Interceptors & Pipes Pipeline"
  },
  {
    id: "nest-q09",
    trackKey: "nestjs",
    category: "Decorators",
    subtopic: "Custom Param Decorators",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do you build Custom Param Decorators in NestJS using `createParamDecorator` (e.g. `@CurrentUser()`)?",
    answer: `### Simple answer:
NestJS provides built-in parameter decorators like \`@Body()\`, \`@Query()\`, and \`@Param()\`. When you frequently extract custom data from incoming requests (like an authenticated user attached by passport), you can build a custom param decorator using **\`createParamDecorator\`**.

### Example: \`@CurrentUser\` Decorator
\`\`\`typescript
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user; // attached by auth guard

    // If a specific property is requested: @CurrentUser('email')
    return data ? user?.[data] : user;
  }
);
\`\`\`

### Clean usage in Controllers:
\`\`\`typescript
@Get("profile")
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUser() user: UserEntity) {
  return user; // Clean, readable, and strictly typed!
}

@Get("email")
@UseGuards(JwtAuthGuard)
getEmail(@CurrentUser("email") email: string) {
  return { email };
}
\`\`\`

### Interview answer:
We create custom parameter decorators using \`createParamDecorator((data, ctx) => ...)\`. This extracts data cleanly from \`ExecutionContext\` (such as \`request.user\`) and injects it directly into controller method parameters, eliminating repetitive boilerplate code across endpoints.`,
    followUps: [
      "Why is @CurrentUser() cleaner than accessing @Req() req: Request directly?",
      "Can custom param decorators apply validation pipes to their extracted values?",
      "How does ExecutionContext support GraphQL contexts in custom decorators?"
    ],
    keyPoints: [
      "createParamDecorator extracts specific request fields cleanly",
      "Avoids injecting raw Express Request objects into handlers",
      "Supports passing parameter arguments (@CurrentUser('id'))",
      "Works uniformly across HTTP, GraphQL, and microservice contexts"
    ],
    tags: ["decorators", "custom-decorators", "createParamDecorator", "clean-code"],
    relatedLessonSlug: "/learn/nestjs/nest03-guards-interceptors-pipes",
    relatedLessonName: "NEST-03: Guards, Interceptors & Pipes Pipeline"
  },
  {
    id: "nest-q10",
    trackKey: "nestjs",
    category: "Internals & Performance",
    subtopic: "Provider Scopes",
    type: "internals",
    difficulty: "medium",
    source: "curated",
    question: "What are Provider Scopes in NestJS (`DEFAULT`, `REQUEST`, `TRANSIENT`), and why should you avoid `REQUEST` scope unless necessary?",
    answer: `### Simple answer:
Provider Scopes dictate the lifecycle of an injected provider instance:

1. **\`Scope.DEFAULT\` (Singleton - Recommended):**
   - A **single instance** is created at application bootstrap and shared across the entire application and all requests.
   - Extremely fast and memory efficient.

2. **\`Scope.REQUEST\` (Per Request):**
   - A **new instance** is created for **every single incoming HTTP request** and garbage collected when the request completes.

3. **\`Scope.TRANSIENT\` (Per Consumer):**
   - A dedicated instance is created for each class that injects it.

### Why you should AVOID \`Scope.REQUEST\` whenever possible:
- **Scope Bubbling:** If a low-level service is marked \`Scope.REQUEST\`, **every service and controller that injects it automatically bubbles up to become REQUEST scoped too!**
- **Performance penalty:** Creating dozens of object instances and re-running DI resolution on every HTTP request adds significant CPU overhead and causes garbage collection thrashing, reducing throughput by up to 5x!

### When is REQUEST scope actually needed?
Only when you must inject request-specific metadata directly into deep services (like request-scoped multi-tenancy database routing or request IDs).

### Interview answer:
NestJS provides three provider scopes: Singleton (DEFAULT), Per-Request (REQUEST), and Transient (TRANSIENT). Singleton is preferred for high performance. REQUEST scope creates a new instance per incoming request and bubbles up through the dependency graph, introducing substantial memory and CPU overhead.`,
    followUps: [
      "What is Scope Bubbling in NestJS dependency injection?",
      "How can AsyncLocalStorage provide request context in Singletons without REQUEST scope?",
      "How do durable providers improve REQUEST scope performance in multi-tenant apps?"
    ],
    keyPoints: [
      "Scope.DEFAULT is a shared singleton created at boot (recommended)",
      "Scope.REQUEST creates a new instance for every incoming request",
      "Scope bubbling causes parent dependents to become request-scoped too",
      "Use AsyncLocalStorage for request-bound context without hurting performance"
    ],
    tags: ["provider-scopes", "singleton", "request-scope", "performance", "internals"],
    relatedLessonSlug: "/learn/nestjs/nest02-modules-controllers-providers",
    relatedLessonName: "NEST-02: Modules, Controllers & Injectable Providers"
  },
  {
    id: "nest-q11",
    trackKey: "nestjs",
    category: "Microservices & Distributed Systems",
    subtopic: "Microservices Transports",
    type: "architecture",
    difficulty: "hard",
    source: "curated",
    question: "How does NestJS handle Microservices architecture, and what is the difference between `@MessagePattern()` and `@EventPattern()`?",
    answer: `### Simple answer:
NestJS has a built-in \`@nestjs/microservices\` package that abstracts distributed communication across different transport protocols (TCP, Redis, RabbitMQ, Kafka, NATS, gRPC) using a unified programming model.

### Key Communication Patterns:
1. **Request-Response (\`@MessagePattern()\`):**
   - Two-way communication. The sender sends a message and **expects a response back**.
   - Ideal for queries and synchronous actions (e.g. validating a promo code).
2. **Event-Driven / Pub-Sub (\`@EventPattern()\`):**
   - One-way fire-and-forget. The sender emits an event and **does not wait for a response**.
   - Ideal for notifications, metrics, audit logging, and email dispatches.

### Example Microservice Handler:
\`\`\`typescript
@Controller()
export class NotificationController {
  // Request-Response:
  @MessagePattern({ cmd: "calculate_tax" })
  calculateTax(data: { amount: number }) {
    return { tax: data.amount * 0.2 };
  }

  // Fire-and-forget Event:
  @EventPattern("user_created")
  handleUserCreated(data: { userId: string, email: string }) {
    this.emailService.sendWelcomeEmail(data.email);
  }
}
\`\`\`

### Interview answer:
NestJS supports microservices across multiple transports like Redis, RabbitMQ, and gRPC. It distinguishes between Request-Response patterns using \`@MessagePattern\` (where the caller waits for a returned value) and asynchronous fire-and-forget events using \`@EventPattern\` (where events are published without waiting for return values).`,
    followUps: [
      "How does ClientProxy send messages and events to microservices in NestJS?",
      "Why is gRPC preferred for high-throughput internal microservice communication?",
      "How does Kafka partitioning integrate with NestJS message consumers?"
    ],
    keyPoints: [
      "@nestjs/microservices supports TCP, Redis, RabbitMQ, Kafka, gRPC",
      "@MessagePattern for synchronous two-way request-response",
      "@EventPattern for asynchronous one-way fire-and-forget events",
      "ClientProxy provides the client interface to dispatch messages"
    ],
    tags: ["microservices", "message-pattern", "event-pattern", "rabbitmq", "grpc"],
    relatedLessonSlug: "/learn/nestjs/nest04-microservices-and-transports",
    relatedLessonName: "NEST-04: Microservices Architecture & Message Transports"
  },
  {
    id: "nest-q12",
    trackKey: "nestjs",
    category: "Advanced Modules",
    subtopic: "Dynamic Modules",
    type: "architecture",
    difficulty: "hard",
    source: "curated",
    question: "What are Dynamic Modules in NestJS, and what is the difference between `register()`, `forRoot()`, and `forRootAsync()`?",
    answer: `### Simple answer:
A Dynamic Module is a module that can be customized and configured dynamically with options when imported, instead of having hardcoded static providers.

### Standard Method Naming Conventions:
- **\`register()\`**: Configures a dynamic module for use in a **specific single importing module** (e.g. \`JwtModule.register({ secret: '...' })\`).
- **\`forRoot()\`**: Configures a dynamic module **once at the root level** and shares its configuration throughout the entire application (e.g. \`TypeOrmModule.forRoot(...)\`).
- **\`forRootAsync()\`**: Configures a root module **asynchronously**, allowing options to be loaded from an external service like \`ConfigService\` or an async database call!

### Example: \`forRootAsync\` with ConfigService
\`\`\`typescript
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        url: config.get<string>("DATABASE_URL"),
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class AppModule {}
\`\`\`

### Interview answer:
Dynamic Modules configure providers dynamically at import time. \`register()\` configures module-scoped options, \`forRoot()\` configures global application-wide options, and \`forRootAsync()\` resolves configuration options asynchronously from services like \`ConfigService\` using factory functions.`,
    followUps: [
      "What is ConfigurableModuleBuilder introduced in NestJS 9?",
      "What does the global: true property do on DynamicModule return objects?",
      "Why can't forRoot accept asynchronous options directly without forRootAsync?"
    ],
    keyPoints: [
      "Dynamic modules customize providers and exports using static methods",
      "register() for module-local configurations",
      "forRoot() for global static configurations",
      "forRootAsync() resolves options asynchronously using useFactory and injected services"
    ],
    tags: ["dynamic-modules", "forRoot", "forRootAsync", "architecture", "config"],
    relatedLessonSlug: "/learn/nestjs/nest02-modules-controllers-providers",
    relatedLessonName: "NEST-02: Modules, Controllers & Injectable Providers"
  }
];
