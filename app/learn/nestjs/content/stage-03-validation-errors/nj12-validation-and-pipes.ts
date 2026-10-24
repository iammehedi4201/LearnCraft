import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj12ValidationAndPipesContent: StandardLessonContent = {
  slug: "nj12-validation-and-pipes",
  code: "NJ-12",
  title: "Validation and Pipes",
  subtitle: "A pipe runs before the controller method to validate or transform incoming request data.",
  difficulty: "Difficult",
  scenario: {
    question: "A user sends an empty course title, but it must have at least three characters. Where should this rule be checked?",
    answer: "Add `@MinLength(3)` to the DTO property and enable a `ValidationPipe` so NestJS checks the request before it reaches the controller.",
  },
  interviewQuestion: {
    question: "What is the purpose of a pipe in NestJS?",
    answer: "A pipe can check or transform input before the controller method handles the request.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Validation and Pipes",
    bigPicture: "A pipe runs before the controller method. Pipes can transform an input or check it. A ValidationPipe can check incoming data against validation rules on a DTO.",
    analogy: "A validation pipe is like the metal detector and security conveyor belt at an airport. Every piece of luggage (request data) is scanned against strict safety regulations before any passenger can board the aircraft (controller).",
    codeSnippet: "// create-course.dto.ts\nimport { IsNotEmpty, MinLength } from 'class-validator';\n\nexport class CreateCourseDto {\n  @IsNotEmpty()\n  @MinLength(3)\n  title!: string;\n}\n\n// main.ts\nimport { ValidationPipe } from '@nestjs/common';\nimport { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  app.useGlobalPipes(new ValidationPipe());\n  await app.listen(3000);\n}\nbootstrap();",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. Validation Decorators",
            "desc": "@IsNotEmpty() and @MinLength(3) define validation constraints on DTO fields."
      },
      {
            "title": "2. Global ValidationPipe",
            "desc": "app.useGlobalPipes(new ValidationPipe()) enables automatic validation across every controller in the app."
      },
      {
            "title": "3. Automatic 400 Bad Request",
            "desc": "If incoming JSON violates any rule, NestJS automatically stops the request and returns a detailed 400 response."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Automated Validation Rule",
      "content": "Validate incoming data at the perimeter using ValidationPipe. Keep invalid data out of controllers and services entirely."
},
    cards: [
      {
            "number": "01",
            "tag": "CHECK",
            "title": "Automatic Validation",
            "description": "Rejects malformed requests with detailed error messages before handler execution.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "TRANSFORM",
            "title": "Data Transformation",
            "description": "Built-in pipes like ParseIntPipe transform string route params into real JavaScript numbers.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "CLEAN",
            "title": "Whitelisting & Stripping",
            "description": "ValidationPipe can strip unknown payload properties to prevent parameter pollution attacks.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Essential pipe patterns in production:",
    points: [
      {
            "title": "1. Required Packages",
            "content": "Install class-validator and class-transformer: npm install class-validator class-transformer."
      },
      {
            "title": "2. ParseIntPipe for ID Parameters",
            "content": "Use @Get(':id') getOne(@Param('id', ParseIntPipe) id: number) to automatically convert strings to numbers."
      },
      {
            "title": "3. Stripping Extra Fields",
            "content": "Passing new ValidationPipe({ whitelist: true }) strips any properties sent by the client not declared in the DTO."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Manually Checking Field Lengths in Handlers",
      "code": "// Bad: Cluttering controllers with manual validation\n@Post()\ncreateCourse(@Body() body: any) {\n  if (!body.title || body.title.length < 3) {\n    throw new BadRequestException('Title must have at least 3 chars');\n  }\n  return this.service.create(body);\n}",
      "explanation": "Manual validation checks duplicate code and clutter business logic."
},
    good: {
      "title": "Declarative DTO Validation",
      "code": "// Clean: Declarative validation via DTO\nexport class CreateCourseDto {\n  @IsNotEmpty()\n  @MinLength(3)\n  title!: string;\n}\n\n@Post()\ncreateCourse(@Body() dto: CreateCourseDto) {\n  // ValidationPipe guarantees dto.title is valid here!\n  return this.service.create(dto);\n}",
      "explanation": "ValidationPipe stops invalid requests automatically before they reach your handler."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect a validated DTO definition:",
    starterCode: "import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';\n\nexport class CreateUserDto {\n  @IsNotEmpty()\n  name!: string;\n\n  @IsEmail()\n  email!: string;\n\n  @MinLength(6)\n  password!: string;\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the key difference between a DTO and a Pipe in NestJS?",
      "options": [
            "A DTO describes the shape of the data; a pipe checks or transforms the data before the handler runs",
            "A DTO runs in the browser; a pipe runs in the database",
            "Pipes cannot return errors; DTOs only return numbers",
            "They are identical and can be used interchangeably"
      ],
      "correctIndex": 0,
      "explanation": "A DTO defines the data structure contract, while a pipe executes logic to validate or transform incoming input."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Perimeter Defense",
            "desc": "Pipes validate and transform request data before controller methods execute."
      },
      {
            "title": "ValidationPipe",
            "desc": "Checks incoming JSON payloads against class-validator decorators on DTOs."
      },
      {
            "title": "Automatic 400s",
            "desc": "Invalid data triggers clean, formatted error responses without manual if-statements."
      }
],
    nextLessonPreview: {
      "title": "Handling Errors",
      "desc": "Learn how to use built-in HTTP exceptions like NotFoundException to report errors clearly."
},
  },
};
