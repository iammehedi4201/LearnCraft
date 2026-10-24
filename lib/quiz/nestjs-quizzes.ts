/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NESTJS CURRICULUM QUIZZES — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative, high-yield module quizzes for all 20 lessons in the
 * NestJS track (NJ-01 through NJ-20).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ModuleQuiz } from "./quiz-types";

export const NESTJS_MODULE_QUIZZES: ModuleQuiz[] = [
  {
    "id": "quiz-nestjs-nj01",
    "lessonSlug": "nj01-what-is-nestjs",
    "lessonCode": "NJ-01",
    "lessonTitle": "What Is NestJS?",
    "description": "Assess your understanding of NestJS architecture, modules, and controller routing.",
    "questions": [
      {
        "id": "nj01-q1",
        "type": "multiple_choice",
        "title": "Framework Architecture",
        "prompt": "What is the primary role of NestJS in the Node.js ecosystem?",
        "options": [
          "It provides a structured, opinionated framework using modules, controllers, and services",
          "It is a database engine that replaces PostgreSQL and MongoDB",
          "It is a CSS layout engine for mobile applications",
          "It is a browser extension for inspecting HTML elements"
        ],
        "correctAnswer": 0,
        "explanation": "NestJS provides a clear architectural structure for server-side Node.js applications using modules, controllers, and providers.",
        "hint": "Think about the structure and organization NestJS gives to server code.",
        "hintCostXP": 5
      },
      {
        "id": "nj01-q2",
        "type": "code_output",
        "title": "Controller Mapping",
        "prompt": "Given this controller, what HTTP request triggers the sayHello() method?",
        "codeSnippet": "@Controller('api')\nclass AppController {\n  @Get('welcome')\n  sayHello() { return { msg: 'Hi' }; }\n}",
        "language": "typescript",
        "options": [
          "GET /api/welcome",
          "POST /api/welcome",
          "GET /welcome",
          "POST /api"
        ],
        "correctAnswer": 0,
        "explanation": "The base route /api combined with the method path 'welcome' maps GET requests sent to /api/welcome.",
        "hint": "Combine the controller prefix with the method route path.",
        "hintCostXP": 5
      },
      {
        "id": "nj01-q3",
        "type": "multiple_choice",
        "title": "Response Handling",
        "prompt": "When a controller method returns a plain JavaScript object in NestJS, what happens?",
        "options": [
          "NestJS automatically serializes the object to JSON and sends a 200 OK status",
          "The server crashes because only strings are allowed",
          "NestJS converts the object to XML binary data",
          "The client browser prompts to download a .txt file"
        ],
        "correctAnswer": 0,
        "explanation": "NestJS automatically handles JSON serialization for returned objects and arrays, setting the Content-Type to application/json.",
        "hint": "NestJS automatically serializes JavaScript primitives for HTTP clients.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj03",
    "lessonSlug": "nj03-project-structure-and-main",
    "lessonCode": "NJ-03",
    "lessonTitle": "Project Structure and main.ts",
    "description": "Test your understanding of the main.ts bootstrap flow and application startup.",
    "questions": [
      {
        "id": "nj03-q1",
        "type": "multiple_choice",
        "title": "Entry Point",
        "prompt": "Which file is the primary starting entry point of a standard NestJS application?",
        "options": [
          "src/main.ts",
          "src/app.controller.ts",
          "package.json",
          "src/index.html"
        ],
        "correctAnswer": 0,
        "explanation": "src/main.ts is executed to bootstrap the application instance via NestFactory and begin listening on a port.",
        "hint": "Look for the file that calls NestFactory.create().",
        "hintCostXP": 5
      },
      {
        "id": "nj03-q2",
        "type": "code_output",
        "title": "Changing Port",
        "prompt": "Where do you configure the server to listen on port 4000 instead of 3000?",
        "codeSnippet": "async function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  await app.listen(3000); // <-- here\n}",
        "language": "typescript",
        "options": [
          "Change 3000 to 4000 in app.listen(4000) inside main.ts",
          "Change the database connection string in tsconfig.json",
          "Rename AppModule to App4000Module",
          "Run npm install port-4000"
        ],
        "correctAnswer": 0,
        "explanation": "The port number passed to app.listen() in main.ts dictates which network port the HTTP server binds to.",
        "hint": "The argument to app.listen() sets the port.",
        "hintCostXP": 5
      },
      {
        "id": "nj03-q3",
        "type": "multiple_choice",
        "title": "Root Module",
        "prompt": "Which module is passed to NestFactory.create() as the root of the dependency tree?",
        "options": [
          "AppModule",
          "NodeModule",
          "PackageModule",
          "ExpressModule"
        ],
        "correctAnswer": 0,
        "explanation": "AppModule is conventionally the root module of every NestJS application, importing all other feature modules.",
        "hint": "It represents the root of the entire application tree.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj04",
    "lessonSlug": "nj04-modules",
    "lessonCode": "NJ-04",
    "lessonTitle": "Modules",
    "description": "Check your knowledge of @Module metadata, encapsulation, and provider sharing.",
    "questions": [
      {
        "id": "nj04-q1",
        "type": "multiple_choice",
        "title": "Module Purpose",
        "prompt": "Why does NestJS organize applications into modules?",
        "options": [
          "To group related controllers and providers into clean, decoupled feature blocks",
          "To enforce that all code is written in pure JavaScript without types",
          "To eliminate the need for HTTP controllers",
          "To prevent files from having more than 50 lines"
        ],
        "correctAnswer": 0,
        "explanation": "Modules organize applications into cohesive domain feature units, establishing clear boundaries as projects grow.",
        "hint": "Think about feature organization and modular boundaries.",
        "hintCostXP": 5
      },
      {
        "id": "nj04-q2",
        "type": "code_output",
        "title": "Exporting Providers",
        "prompt": "If UsersModule wants to allow other modules to use UsersService, what property must be added to @Module()?",
        "codeSnippet": "@Module({\n  controllers: [UsersController],\n  providers: [UsersService],\n  // ???\n})\nexport class UsersModule {}",
        "language": "typescript",
        "options": [
          "exports: [UsersService]",
          "imports: [UsersService]",
          "public: true",
          "global: [UsersService]"
        ],
        "correctAnswer": 0,
        "explanation": "Listing a provider in the exports array makes it available to any module that imports UsersModule.",
        "hint": "The exports array exposes providers to consuming modules.",
        "hintCostXP": 5
      },
      {
        "id": "nj04-q3",
        "type": "multiple_choice",
        "title": "Provider Scope",
        "prompt": "By default, are providers in a module visible to other modules without exporting?",
        "options": [
          "No, providers are encapsulated and private to their module by default",
          "Yes, every provider in NestJS is automatically global",
          "Only if the provider has more than 100 lines of code",
          "Only on Windows operating systems"
        ],
        "correctAnswer": 0,
        "explanation": "NestJS enforces encapsulation: providers are strictly private to their declaring module unless explicitly exported.",
        "hint": "NestJS favors encapsulation by default.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj05",
    "lessonSlug": "nj05-controllers",
    "lessonCode": "NJ-05",
    "lessonTitle": "Controllers",
    "description": "Test your understanding of controller routing, request handling, and responsibility.",
    "questions": [
      {
        "id": "nj05-q1",
        "type": "multiple_choice",
        "title": "Controller Role",
        "prompt": "What is the primary responsibility of a Controller in NestJS?",
        "options": [
          "Receiving HTTP requests, routing them to methods, and returning responses",
          "Directly executing SQL queries against the database",
          "Rendering React HTML on client browsers",
          "Managing operating system threads"
        ],
        "correctAnswer": 0,
        "explanation": "Controllers act as the HTTP entry point: they receive client requests, call services for business logic, and return responses.",
        "hint": "Controllers manage the HTTP request/response cycle.",
        "hintCostXP": 5
      },
      {
        "id": "nj05-q2",
        "type": "code_output",
        "title": "Route Prefix",
        "prompt": "What URL endpoint does this method handle?",
        "codeSnippet": "@Controller('courses')\nexport class CoursesController {\n  @Get('popular')\n  getPopular() { return []; }\n}",
        "language": "typescript",
        "options": [
          "GET /courses/popular",
          "POST /courses/popular",
          "GET /popular",
          "GET /courses"
        ],
        "correctAnswer": 0,
        "explanation": "The controller path 'courses' combines with the method path 'popular' to form /courses/popular.",
        "hint": "Combine the class path and the method path.",
        "hintCostXP": 5
      },
      {
        "id": "nj05-q3",
        "type": "multiple_choice",
        "title": "Controller Best Practice",
        "prompt": "What should you do if a controller method starts growing with 200 lines of business calculations?",
        "options": [
          "Move the business logic into an injectable service and call the service from the controller",
          "Delete the controller entirely",
          "Store the calculation in a global window variable",
          "Convert the method into a bash script"
        ],
        "correctAnswer": 0,
        "explanation": "Controllers should remain thin coordinators. Complex business rules belong in services for testability and reuse.",
        "hint": "Controllers coordinate; services calculate.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj06",
    "lessonSlug": "nj06-routes-and-http-methods",
    "lessonCode": "NJ-06",
    "lessonTitle": "Routes and HTTP Methods",
    "description": "Verify your understanding of RESTful HTTP methods and route decorators.",
    "questions": [
      {
        "id": "nj06-q1",
        "type": "multiple_choice",
        "title": "Safe Operations",
        "prompt": "Which HTTP method should be used when the client only wants to read a list of items?",
        "options": [
          "GET",
          "POST",
          "DELETE",
          "PUT"
        ],
        "correctAnswer": 0,
        "explanation": "GET is the standard idempotent, safe HTTP method for reading resources without modifying server state.",
        "hint": "Think about retrieving data without changing it.",
        "hintCostXP": 5
      },
      {
        "id": "nj06-q2",
        "type": "code_output",
        "title": "POST Status Code",
        "prompt": "What HTTP status code does NestJS return by default for a successful @Post() handler?",
        "codeSnippet": "@Post()\ncreate() {\n  return { id: 1 };\n}",
        "language": "typescript",
        "options": [
          "201 Created",
          "200 OK",
          "204 No Content",
          "400 Bad Request"
        ],
        "correctAnswer": 0,
        "explanation": "By standard REST conventions, NestJS returns 201 Created for successful POST requests (and 200 OK for other verbs).",
        "hint": "Creating resources returns 201 by default.",
        "hintCostXP": 5
      },
      {
        "id": "nj06-q3",
        "type": "multiple_choice",
        "title": "Dynamic Segment",
        "prompt": "How do you specify a dynamic parameter named id in a route decorator?",
        "options": [
          "@Get(':id')",
          "@Get('{id}')",
          "@Get('$id')",
          "@Get('?id')"
        ],
        "correctAnswer": 0,
        "explanation": "NestJS follows Express URL pattern syntax where a colon prefix denotes a route parameter (e.g. :id).",
        "hint": "Colon prefixes dynamic segments in path strings.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj07",
    "lessonSlug": "nj07-parameters-and-request-bodies",
    "lessonCode": "NJ-07",
    "lessonTitle": "Route Parameters, Query Parameters, and Request Bodies",
    "description": "Check your skills extracting data with @Param, @Query, and @Body.",
    "questions": [
      {
        "id": "nj07-q1",
        "type": "multiple_choice",
        "title": "Parameter Decorators",
        "prompt": "Which decorator is used to extract query string values such as ?page=2 from a request?",
        "options": [
          "@Query('page')",
          "@Param('page')",
          "@Body('page')",
          "@Header('page')"
        ],
        "correctAnswer": 0,
        "explanation": "@Query('page') extracts the URL query string parameter named 'page'.",
        "hint": "Query strings follow the question mark.",
        "hintCostXP": 5
      },
      {
        "id": "nj07-q2",
        "type": "code_output",
        "title": "Extracting Route Params",
        "prompt": "In a request to GET /items/99, what value is received by the itemId parameter?",
        "codeSnippet": "@Get(':id')\ngetItem(@Param('id') itemId: string) {\n  return itemId;\n}",
        "language": "typescript",
        "options": [
          "'99'",
          "undefined",
          "null",
          "99 (number)"
        ],
        "correctAnswer": 0,
        "explanation": "Route parameters are parsed from the URL string as strings by default, receiving '99'.",
        "hint": "URL segments arrive as text strings.",
        "hintCostXP": 5
      },
      {
        "id": "nj07-q3",
        "type": "multiple_choice",
        "title": "Request Body",
        "prompt": "Which decorator should be used to extract the JSON payload submitted in a POST request?",
        "options": [
          "@Body()",
          "@Param()",
          "@Query()",
          "@Payload()"
        ],
        "correctAnswer": 0,
        "explanation": "@Body() extracts the parsed request body from the incoming HTTP request.",
        "hint": "The payload lives in the request body.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj08",
    "lessonSlug": "nj08-providers-and-services",
    "lessonCode": "NJ-08",
    "lessonTitle": "Providers and Services",
    "description": "Assess your knowledge of @Injectable providers and service encapsulation.",
    "questions": [
      {
        "id": "nj08-q1",
        "type": "multiple_choice",
        "title": "Service Definition",
        "prompt": "What decorator must be placed above a class to register it as an injectable provider in NestJS?",
        "options": [
          "@Injectable()",
          "@Service()",
          "@Provider()",
          "@Component()"
        ],
        "correctAnswer": 0,
        "explanation": "@Injectable() flags a class so the NestJS IoC container can manage its lifecycle and inject it.",
        "hint": "The decorator indicates the class is injectable.",
        "hintCostXP": 5
      },
      {
        "id": "nj08-q2",
        "type": "code_output",
        "title": "Provider Sharing",
        "prompt": "If two different controllers inject the same CoursesService, how many instances of CoursesService does NestJS create by default?",
        "codeSnippet": "@Injectable()\nexport class CoursesService {}",
        "language": "typescript",
        "options": [
          "Exactly 1 instance (Singleton scope by default)",
          "A new instance for each controller (2 instances)",
          "A new instance for every HTTP request",
          "0 instances (services are static functions)"
        ],
        "correctAnswer": 0,
        "explanation": "NestJS providers are singletons by default: one instance is created during startup and shared across the entire app.",
        "hint": "NestJS uses the singleton pattern by default for providers.",
        "hintCostXP": 5
      },
      {
        "id": "nj08-q3",
        "type": "multiple_choice",
        "title": "Business Logic Separation",
        "prompt": "Where should shared business logic that applies to multiple controllers reside?",
        "options": [
          "Inside a service class that can be injected into any controller",
          "Directly in main.ts",
          "Inside the database connection URL",
          "In the browser LocalStorage"
        ],
        "correctAnswer": 0,
        "explanation": "Services encapsulate reusable business logic, allowing multiple controllers to share the exact same methods.",
        "hint": "Services provide reusable business logic.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj09",
    "lessonSlug": "nj09-dependency-injection",
    "lessonCode": "NJ-09",
    "lessonTitle": "Dependency Injection",
    "description": "Test your mastery of constructor injection and IoC container resolution.",
    "questions": [
      {
        "id": "nj09-q1",
        "type": "multiple_choice",
        "title": "DI Concept",
        "prompt": "What is Dependency Injection (DI) in NestJS?",
        "options": [
          "A pattern where NestJS creates and provides dependent objects to a class instead of the class instantiating them with new",
          "Injecting raw CSS into HTML pages",
          "Injecting SQL directly into URL parameters",
          "Downloading npm packages at runtime"
        ],
        "correctAnswer": 0,
        "explanation": "Dependency injection inverts control: the framework instantiates and supplies needed helpers rather than classes creating them.",
        "hint": "The framework injects dependencies automatically.",
        "hintCostXP": 5
      },
      {
        "id": "nj09-q2",
        "type": "code_output",
        "title": "Constructor Injection Syntax",
        "prompt": "How does this controller receive its service dependency?",
        "codeSnippet": "@Controller('users')\nexport class UsersController {\n  constructor(private readonly usersService: UsersService) {}\n}",
        "language": "typescript",
        "options": [
          "NestJS reads the UsersService type and injects the registered instance on startup",
          "The developer must manually call new UsersController(new UsersService()) in main.ts",
          "It reads a global window.usersService variable",
          "It throws an error because private constructors are not allowed"
        ],
        "correctAnswer": 0,
        "explanation": "NestJS inspects the constructor parameter types and injects the matching provider from the module container automatically.",
        "hint": "Constructor parameters define dependencies.",
        "hintCostXP": 5
      },
      {
        "id": "nj09-q3",
        "type": "multiple_choice",
        "title": "Resolution Error",
        "prompt": "What causes the famous 'Nest can't resolve dependencies of Controller (?)' error?",
        "options": [
          "The required service was not listed in the module's providers array or its exporting module was not imported",
          "The computer disconnected from the internet",
          "The port 3000 is occupied",
          "TypeScript was updated to a newer version"
        ],
        "correctAnswer": 0,
        "explanation": "When NestJS cannot find a provider for a constructor token, it means the provider was omitted from providers or exports.",
        "hint": "Check providers and module imports.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj10",
    "lessonSlug": "nj10-decorators",
    "lessonCode": "NJ-10",
    "lessonTitle": "Decorators",
    "description": "Verify your understanding of class, method, and parameter decorators in NestJS.",
    "questions": [
      {
        "id": "nj10-q1",
        "type": "multiple_choice",
        "title": "Decorator Function",
        "prompt": "How do decorators communicate information to the NestJS runtime?",
        "options": [
          "By attaching metadata to classes, methods, and parameters that NestJS reads during boot",
          "By compiling directly into raw database SQL commands",
          "By creating temporary files on the user's desktop",
          "By sending emails to developers"
        ],
        "correctAnswer": 0,
        "explanation": "Decorators attach metadata using Reflect Metadata APIs, which NestJS reads to wire routes, pipes, and providers.",
        "hint": "Decorators attach metadata.",
        "hintCostXP": 5
      },
      {
        "id": "nj10-q2",
        "type": "code_output",
        "title": "Parameter Decorator",
        "prompt": "What does @Headers('authorization') do when attached to a parameter?",
        "codeSnippet": "@Get('profile')\ngetProfile(@Headers('authorization') authHeader: string) {\n  return { authHeader };\n}",
        "language": "typescript",
        "options": [
          "Extracts the 'authorization' HTTP request header into authHeader",
          "Sends an authorization cookie to the client",
          "Deletes the authorization header before the request reaches the server",
          "Encrypts the header value"
        ],
        "correctAnswer": 0,
        "explanation": "@Headers('authorization') extracts the specified HTTP header from the incoming request.",
        "hint": "It extracts the named header value.",
        "hintCostXP": 5
      },
      {
        "id": "nj10-q3",
        "type": "multiple_choice",
        "title": "Three Decorator Types",
        "prompt": "Which three targets can decorators apply to in a typical NestJS controller?",
        "options": [
          "Classes, methods, and method parameters",
          "HTML elements, CSS classes, and SVG tags",
          "SQL tables, columns, and rows",
          "Git branches, commits, and pull requests"
        ],
        "correctAnswer": 0,
        "explanation": "NestJS uses class decorators (@Controller), method decorators (@Get), and parameter decorators (@Param, @Body).",
        "hint": "Class level, method level, and argument level.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj11",
    "lessonSlug": "nj11-dtos-data-transfer-objects",
    "lessonCode": "NJ-11",
    "lessonTitle": "DTOs (Data Transfer Objects)",
    "description": "Check your knowledge of DTO classes, payload schemas, and contracts.",
    "questions": [
      {
        "id": "nj11-q1",
        "type": "multiple_choice",
        "title": "DTO Purpose",
        "prompt": "What is the primary role of a DTO (Data Transfer Object) in NestJS?",
        "options": [
          "To clearly define the shape and type contract of data sent across network requests",
          "To format the database partition tables on disk",
          "To replace React components in frontend rendering",
          "To manage background cron threads"
        ],
        "correctAnswer": 0,
        "explanation": "DTOs specify the exact shape and properties expected in requests and responses, providing clarity and validation hooks.",
        "hint": "DTOs define data contracts.",
        "hintCostXP": 5
      },
      {
        "id": "nj11-q2",
        "type": "code_output",
        "title": "Class vs Interface",
        "prompt": "Why does NestJS use TypeScript classes for DTOs rather than interfaces?",
        "codeSnippet": "// DTO as a class\nexport class CreatePostDto {\n  title!: string;\n  content!: string;\n}",
        "language": "typescript",
        "options": [
          "Classes persist in compiled JavaScript, allowing runtime validation pipes to inspect properties",
          "Classes are 10x faster than interfaces in V8",
          "Interfaces cannot be imported across different files",
          "Interfaces are deprecated in ES6"
        ],
        "correctAnswer": 0,
        "explanation": "Interfaces are erased during compilation, but classes exist at runtime so ValidationPipe and class-validator can read metadata.",
        "hint": "Classes exist at runtime in JavaScript.",
        "hintCostXP": 5
      },
      {
        "id": "nj11-q3",
        "type": "multiple_choice",
        "title": "Controller Integration",
        "prompt": "How does a controller handler indicate that it expects a specific DTO in the body?",
        "options": [
          "@Body() createDto: CreatePostDto",
          "@Param() createDto: CreatePostDto",
          "@Query() createDto: CreatePostDto",
          "@File() createDto: CreatePostDto"
        ],
        "correctAnswer": 0,
        "explanation": "Combining @Body() with a DTO type annotation instructs NestJS and validation pipes to parse and check the payload.",
        "hint": "Use @Body() with the DTO class type.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj12",
    "lessonSlug": "nj12-validation-and-pipes",
    "lessonCode": "NJ-12",
    "lessonTitle": "Validation and Pipes",
    "description": "Test your skills using ValidationPipe and class-validator decorators.",
    "questions": [
      {
        "id": "nj12-q1",
        "type": "multiple_choice",
        "title": "ValidationPipe Role",
        "prompt": "What does ValidationPipe do when an incoming request fails validation rules?",
        "options": [
          "Stops request execution and returns a 400 Bad Request response with detailed error messages",
          "Saves the invalid data into a quarantine table in SQLite",
          "Logs in as the admin user automatically",
          "Deletes the client browser's cookies"
        ],
        "correctAnswer": 0,
        "explanation": "ValidationPipe automatically halts invalid requests, returning a 400 Bad Request status and describing each validation violation.",
        "hint": "It stops the request and returns a 400 error.",
        "hintCostXP": 5
      },
      {
        "id": "nj12-q2",
        "type": "code_output",
        "title": "Validation Decorator",
        "prompt": "What decorator from class-validator ensures a string has at least 5 characters?",
        "codeSnippet": "export class ResetPasswordDto {\n  @MinLength(5)\n  newPassword!: string;\n}",
        "language": "typescript",
        "options": [
          "@MinLength(5)",
          "@IsShort(5)",
          "@Size(5)",
          "@Min(5)"
        ],
        "correctAnswer": 0,
        "explanation": "@MinLength(n) validates that a string's length is greater than or equal to n.",
        "hint": "MinLength checks string character count.",
        "hintCostXP": 5
      },
      {
        "id": "nj12-q3",
        "type": "multiple_choice",
        "title": "Data Transformation",
        "prompt": "Which built-in pipe converts a string route param like '42' into a JavaScript number?",
        "options": [
          "ParseIntPipe",
          "StringToNumberPipe",
          "ValidationPipe",
          "FormatPipe"
        ],
        "correctAnswer": 0,
        "explanation": "ParseIntPipe transforms string route parameters into integers or throws a 400 error if parsing fails.",
        "hint": "It parses integer numbers.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj13",
    "lessonSlug": "nj13-handling-errors",
    "lessonCode": "NJ-13",
    "lessonTitle": "Handling Errors",
    "description": "Assess your understanding of HTTP exceptions, error status codes, and exception handling.",
    "questions": [
      {
        "id": "nj13-q1",
        "type": "multiple_choice",
        "title": "Not Found Exception",
        "prompt": "Which exception should be thrown when an item requested by ID does not exist in the database?",
        "options": [
          "NotFoundException",
          "BadRequestException",
          "InternalServerErrorException",
          "ForbiddenException"
        ],
        "correctAnswer": 0,
        "explanation": "NotFoundException maps to HTTP status code 404 Not Found.",
        "hint": "404 Not Found maps to NotFoundException.",
        "hintCostXP": 5
      },
      {
        "id": "nj13-q2",
        "type": "code_output",
        "title": "Exception Status",
        "prompt": "What HTTP status code does NestJS return when this line executes?",
        "codeSnippet": "throw new BadRequestException('Invalid email address');",
        "language": "typescript",
        "options": [
          "400 Bad Request",
          "404 Not Found",
          "500 Internal Server Error",
          "200 OK"
        ],
        "correctAnswer": 0,
        "explanation": "BadRequestException automatically produces a 400 Bad Request HTTP response.",
        "hint": "BadRequest corresponds to HTTP 400.",
        "hintCostXP": 5
      },
      {
        "id": "nj13-q3",
        "type": "multiple_choice",
        "title": "Error Handling Practice",
        "prompt": "Why should you throw specific HTTP exceptions rather than returning error objects with 200 OK?",
        "options": [
          "It conforms to HTTP standards, letting client fetch libraries and caches recognize errors properly",
          "It makes the server consume less electricity",
          "It is required by TypeScript to avoid memory leaks",
          "It encrypts the payload for security"
        ],
        "correctAnswer": 0,
        "explanation": "Semantic status codes ensure that frontend frameworks, HTTP proxies, and monitoring tools correctly recognize failures.",
        "hint": "Proper HTTP status codes ensure standard client behavior.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj14",
    "lessonSlug": "nj14-middleware",
    "lessonCode": "NJ-14",
    "lessonTitle": "Middleware",
    "description": "Verify your understanding of Express-compatible middleware in NestJS.",
    "questions": [
      {
        "id": "nj14-q1",
        "type": "multiple_choice",
        "title": "Middleware Execution Timing",
        "prompt": "When does middleware execute relative to guards and route handlers?",
        "options": [
          "Early, before route matching, guards, pipes, or controllers",
          "After the controller returns its response",
          "Only when an exception filter catches an error",
          "Only in production mode on Fridays"
        ],
        "correctAnswer": 0,
        "explanation": "Middleware runs first in the request pipeline, operating at the raw Express/Fastify level.",
        "hint": "Middleware is the earliest pipeline stage.",
        "hintCostXP": 5
      },
      {
        "id": "nj14-q2",
        "type": "code_output",
        "title": "Calling next()",
        "prompt": "What happens if a middleware function performs logging but never calls next()?",
        "codeSnippet": "use(req: Request, res: Response, next: NextFunction) {\n  console.log(req.url);\n  // next() is omitted!\n}",
        "language": "typescript",
        "options": [
          "The client request hangs until connection timeout",
          "NestJS automatically calls next() after 1 millisecond",
          "The controller method runs immediately",
          "The server throws a compile-time error"
        ],
        "correctAnswer": 0,
        "explanation": "Middleware must either call next() to advance execution or terminate the response (e.g. res.send()). Otherwise the connection hangs.",
        "hint": "Calling next() is mandatory to advance execution.",
        "hintCostXP": 5
      },
      {
        "id": "nj14-q3",
        "type": "multiple_choice",
        "title": "Ideal Use Cases",
        "prompt": "Which task is an ideal fit for NestJS middleware?",
        "options": [
          "Logging incoming request URLs and IP addresses",
          "Writing domain calculations for shopping cart totals",
          "Validating DTO field string lengths",
          "Rendering React JSX components"
        ],
        "correctAnswer": 0,
        "explanation": "Broad, transport-level tasks like request logging, CORS, and header parsing belong in middleware.",
        "hint": "Think about global transport tasks.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj15",
    "lessonSlug": "nj15-guards-and-route-protection",
    "lessonCode": "NJ-15",
    "lessonTitle": "Guards and Route Protection",
    "description": "Test your mastery of route protection, CanActivate, and permission checks.",
    "questions": [
      {
        "id": "nj15-q1",
        "type": "multiple_choice",
        "title": "Guard Interface",
        "prompt": "What interface must a NestJS guard implement?",
        "options": [
          "CanActivate",
          "NestMiddleware",
          "PipeTransform",
          "NestInterceptor"
        ],
        "correctAnswer": 0,
        "explanation": "Guards implement CanActivate, requiring a canActivate(context: ExecutionContext) method that returns boolean or Promise<boolean>.",
        "hint": "It checks if the route can activate.",
        "hintCostXP": 5
      },
      {
        "id": "nj15-q2",
        "type": "code_output",
        "title": "Guard Return Value",
        "prompt": "What happens when canActivate() returns false?",
        "codeSnippet": "canActivate(context: ExecutionContext): boolean {\n  return false;\n}",
        "language": "typescript",
        "options": [
          "NestJS blocks the request and responds with 403 Forbidden",
          "NestJS proceeds to the controller anyway",
          "The server reboots",
          "The client receives 200 OK with null body"
        ],
        "correctAnswer": 0,
        "explanation": "Returning false from canActivate() instructs NestJS to block the request and return 403 Forbidden.",
        "hint": "Returning false denies access with 403.",
        "hintCostXP": 5
      },
      {
        "id": "nj15-q3",
        "type": "multiple_choice",
        "title": "Applying Guards",
        "prompt": "Which decorator is used to apply a guard to a controller or route handler?",
        "options": [
          "@UseGuards()",
          "@Protect()",
          "@Auth()",
          "@Guard()"
        ],
        "correctAnswer": 0,
        "explanation": "@UseGuards(MyGuard) binds guards to controllers or individual route methods.",
        "hint": "Look for @UseGuards.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj16",
    "lessonSlug": "nj16-interceptors",
    "lessonCode": "NJ-16",
    "lessonTitle": "Interceptors",
    "description": "Check your knowledge of request/response interception and RxJS operators.",
    "questions": [
      {
        "id": "nj16-q1",
        "type": "multiple_choice",
        "title": "Interceptor Capability",
        "prompt": "What unique capability distinguishes an Interceptor from middleware and guards?",
        "options": [
          "It can run code both before and after the controller handler executes",
          "It can only run in the browser console",
          "It can only handle DELETE requests",
          "It replaces the database ORM"
        ],
        "correctAnswer": 0,
        "explanation": "Interceptors wrap handler execution, allowing logic to run both before the method and after the response Observable emits.",
        "hint": "Interceptors wrap around the method call.",
        "hintCostXP": 5
      },
      {
        "id": "nj16-q2",
        "type": "code_output",
        "title": "next.handle()",
        "prompt": "What does calling next.handle() inside an interceptor do?",
        "codeSnippet": "intercept(context: ExecutionContext, next: CallHandler): Observable<any> {\n  return next.handle();\n}",
        "language": "typescript",
        "options": [
          "Invokes the route handler and returns an RxJS Observable of the result",
          "Terminates the server connection",
          "Clears the Redis cache",
          "Compiles TypeScript into JavaScript"
        ],
        "correctAnswer": 0,
        "explanation": "next.handle() invokes the actual route handler method, returning an Observable that emits the handler's return value.",
        "hint": "It invokes the route handler.",
        "hintCostXP": 5
      },
      {
        "id": "nj16-q3",
        "type": "multiple_choice",
        "title": "Common Interceptor Task",
        "prompt": "Which task is commonly performed using an interceptor?",
        "options": [
          "Measuring route execution time or wrapping responses in a { data: ... } envelope",
          "Parsing tsconfig.json compiler settings",
          "Connecting to a Wi-Fi network",
          "Creating SQL database schemas"
        ],
        "correctAnswer": 0,
        "explanation": "Benchmarking execution duration and standardizing response structures are primary use cases for interceptors.",
        "hint": "Timing and response formatting are classic use cases.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj17",
    "lessonSlug": "nj17-the-request-lifecycle",
    "lessonCode": "NJ-17",
    "lessonTitle": "The Request Lifecycle",
    "description": "Verify your understanding of the deterministic NestJS request pipeline sequence.",
    "questions": [
      {
        "id": "nj17-q1",
        "type": "multiple_choice",
        "title": "Correct Pipeline Order",
        "prompt": "What is the correct high-level order of request processing in NestJS?",
        "options": [
          "Middleware -> Guards -> Interceptors (pre) -> Pipes -> Controller Handler -> Interceptors (post)",
          "Pipes -> Middleware -> Controller Handler -> Guards",
          "Controller Handler -> Guards -> Pipes -> Middleware",
          "Guards -> Controller Handler -> Middleware -> Pipes"
        ],
        "correctAnswer": 0,
        "explanation": "Middleware runs first, then Guards check access, Interceptors start, Pipes validate inputs, the Controller executes, and Interceptors post-process.",
        "hint": "Middleware runs earliest; Pipes run closest to the handler.",
        "hintCostXP": 5
      },
      {
        "id": "nj17-q2",
        "type": "code_output",
        "title": "Short-Circuiting",
        "prompt": "If a guard returns false, will any ValidationPipe or controller handler execute for that request?",
        "codeSnippet": "@UseGuards(BlockedGuard) // returns false\n@Post()\ncreate(@Body(ValidationPipe) dto: CreateDto) {\n  console.log('HANDLER');\n  return { ok: true };\n}",
        "language": "typescript",
        "options": [
          "No, neither the pipe nor the handler will execute",
          "Yes, the pipe will validate the body first",
          "Yes, the handler will run but return 403",
          "Only in development mode"
        ],
        "correctAnswer": 0,
        "explanation": "Guards evaluate before pipes and handlers. When a guard denies access, the request is terminated immediately, saving resources.",
        "hint": "Fail-fast prevents unnecessary execution.",
        "hintCostXP": 5
      },
      {
        "id": "nj17-q3",
        "type": "multiple_choice",
        "title": "Exception Filters",
        "prompt": "When does an Exception Filter execute?",
        "options": [
          "Whenever an unhandled error or exception is thrown anywhere in the request lifecycle",
          "Only when the server boots up in main.ts",
          "Only for GET requests",
          "Only when client JavaScript crashes"
        ],
        "correctAnswer": 0,
        "explanation": "Exception filters catch unhandled errors from guards, pipes, interceptors, or handlers to format standard error responses.",
        "hint": "They catch exceptions thrown across the lifecycle.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj18",
    "lessonSlug": "nj18-authentication-vs-authorization",
    "lessonCode": "NJ-18",
    "lessonTitle": "Authentication vs. Authorization",
    "description": "Assess your ability to distinguish AuthN (identity) from AuthZ (permissions).",
    "questions": [
      {
        "id": "nj18-q1",
        "type": "multiple_choice",
        "title": "Core Difference",
        "prompt": "What is the key difference between authentication and authorization?",
        "options": [
          "Authentication verifies WHO the user is; authorization checks WHAT the user is allowed to do",
          "Authentication runs in CSS; authorization runs in HTML",
          "Authentication is only for admins; authorization is for guests",
          "They are synonyms for the exact same process"
        ],
        "correctAnswer": 0,
        "explanation": "Authentication proves user identity (e.g. logging in with password or JWT). Authorization verifies if that user has permission for an action.",
        "hint": "Who you are vs what you can do.",
        "hintCostXP": 5
      },
      {
        "id": "nj18-q2",
        "type": "code_output",
        "title": "Status Code Precision",
        "prompt": "A logged-in student tries to delete an instructor's course. Which exception should be thrown?",
        "codeSnippet": "if (user.role !== 'admin') {\n  // User is signed in, but lacks rights:\n  throw new ForbiddenException(); // 403\n}",
        "language": "typescript",
        "options": [
          "ForbiddenException (403)",
          "UnauthorizedException (401)",
          "NotFoundException (404)",
          "BadRequestException (400)"
        ],
        "correctAnswer": 0,
        "explanation": "403 Forbidden is used when identity is known (user logged in) but permissions are insufficient. 401 is reserved for missing or invalid identity.",
        "hint": "403 represents permission denial.",
        "hintCostXP": 5
      },
      {
        "id": "nj18-q3",
        "type": "multiple_choice",
        "title": "Passport Strategy",
        "prompt": "In a NestJS JWT setup, which step represents Authentication?",
        "options": [
          "Validating the JWT token signature and extracting user information into request.user",
          "Checking if user.role === 'admin'",
          "Deleting records from PostgreSQL",
          "Displaying a toast popup in React"
        ],
        "correctAnswer": 0,
        "explanation": "Verifying the JWT token proves the user's identity, which is the definition of authentication.",
        "hint": "Verifying the token proves identity.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj19",
    "lessonSlug": "nj19-testing-a-nestjs-service",
    "lessonCode": "NJ-19",
    "lessonTitle": "Testing a NestJS Service",
    "description": "Test your skills writing isolated unit tests using Test.createTestingModule.",
    "questions": [
      {
        "id": "nj19-q1",
        "type": "multiple_choice",
        "title": "Testing Utility",
        "prompt": "Which utility is used in NestJS to create an in-memory test module for unit testing?",
        "options": [
          "Test.createTestingModule()",
          "NestFactory.create()",
          "new MockApp()",
          "jest.createApp()"
        ],
        "correctAnswer": 0,
        "explanation": "Test.createTestingModule() from @nestjs/testing builds a lightweight in-memory DI container specifically for tests.",
        "hint": "Look for Test.createTestingModule.",
        "hintCostXP": 5
      },
      {
        "id": "nj19-q2",
        "type": "code_output",
        "title": "Resolving Service in Test",
        "prompt": "How do you retrieve the service instance from a compiled TestingModule?",
        "codeSnippet": "const module = await Test.createTestingModule({\n  providers: [GreetingService],\n}).compile();\n\n// Retrieve service:\nconst service = module.get<GreetingService>(GreetingService);",
        "language": "typescript",
        "options": [
          "module.get<GreetingService>(GreetingService)",
          "new GreetingService()",
          "process.env.GreetingService",
          "window.GreetingService"
        ],
        "correctAnswer": 0,
        "explanation": "module.get() queries the compiled testing container for the instantiated provider.",
        "hint": "Use module.get() with the provider class.",
        "hintCostXP": 5
      },
      {
        "id": "nj19-q3",
        "type": "multiple_choice",
        "title": "Mocking Advantage",
        "prompt": "Why should you mock database repositories when unit testing a service?",
        "options": [
          "It makes tests run in milliseconds and prevents tests from depending on external database state",
          "It is required by TypeScript to avoid memory leaks",
          "Databases cannot run on laptops",
          "It automatically populates test databases with fake users"
        ],
        "correctAnswer": 0,
        "explanation": "Mocking external dependencies keeps unit tests fast, isolated, and completely independent of external infrastructure.",
        "hint": "Mocks provide isolation and speed.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  },
  {
    "id": "quiz-nestjs-nj20",
    "lessonSlug": "nj20-organize-a-feature-and-debug",
    "lessonCode": "NJ-20",
    "lessonTitle": "Organize a Feature and Debug Common Problems",
    "description": "Check your mastery of feature folder architecture and debugging circular dependencies.",
    "questions": [
      {
        "id": "nj20-q1",
        "type": "multiple_choice",
        "title": "Feature Folder Layout",
        "prompt": "In a well-organized NestJS project, where should the controller, service, DTOs, and module for courses live?",
        "options": [
          "Colocated together in a dedicated feature folder such as src/courses/",
          "Scattered across unrelated folders based only on file extensions",
          "Directly in the root node_modules directory",
          "Inside public/assets/styles"
        ],
        "correctAnswer": 0,
        "explanation": "Colocating feature files in src/<feature-name>/ keeps domain boundaries clear and maintenance straightforward.",
        "hint": "Colocate related domain files in one folder.",
        "hintCostXP": 5
      },
      {
        "id": "nj20-q2",
        "type": "code_output",
        "title": "Circular Dependencies",
        "prompt": "What utility function does NestJS provide to resolve circular dependencies between modules or providers?",
        "codeSnippet": "// Resolving circular module reference:\n@Module({\n  imports: [forwardRef(() => OtherModule)],\n})",
        "language": "typescript",
        "options": [
          "forwardRef()",
          "deferModule()",
          "circularImport()",
          "lazyLoad()"
        ],
        "correctAnswer": 0,
        "explanation": "forwardRef() allows NestJS to defer referencing a class until both classes have been defined, breaking circular import deadlocks.",
        "hint": "forwardRef resolves circular references.",
        "hintCostXP": 5
      },
      {
        "id": "nj20-q3",
        "type": "multiple_choice",
        "title": "Debugging Checklist",
        "prompt": "If NestJS fails to start with 'Cannot resolve dependency', what should you verify first?",
        "options": [
          "Verify the provider is listed in providers, and if it comes from another module, check imports and exports",
          "Reinstall the operating system",
          "Delete the package.json file",
          "Switch from TypeScript to Python"
        ],
        "correctAnswer": 0,
        "explanation": "Unresolvable dependency errors almost always stem from a missing provider in providers or an omitted module export/import.",
        "hint": "Check providers, imports, and exports.",
        "hintCostXP": 5
      }
    ],
    "trackKey": "nestjs",
    "trackTitle": "NestJS",
    "passingScore": 75,
    "baseXpReward": 30,
    "perfectScoreBonusXp": 15
  }
];
