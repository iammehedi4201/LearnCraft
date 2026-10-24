import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj11DtosDataTransferObjectsContent: StandardLessonContent = {
  slug: "nj11-dtos-data-transfer-objects",
  code: "NJ-11",
  title: "DTOs (Data Transfer Objects)",
  subtitle: "A DTO describes the shape of data entering or leaving your application.",
  difficulty: "Moderate",
  scenario: {
    question: "Your endpoint expects a course title and description. Why create a DTO instead of accepting an unexplained object?",
    answer: "The DTO clearly describes the expected data and provides a place to define validation rules.",
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
    title: "DTOs (Data Transfer Objects)",
    bigPicture: "A DTO describes the shape of data that enters or leaves a part of your application. In NestJS, DTOs are often classes used to describe request bodies and apply validation rules.",
    analogy: "A DTO is like a standard customs declaration form at an airport. Every passenger filling out the form must provide specific lines: full name, flight number, and items to declare. Unofficial, unlabeled scraps of paper are rejected.",
    codeSnippet: "// create-course.dto.ts\nexport class CreateCourseDto {\n  title!: string;\n  description!: string;\n}\n\n// courses.controller.ts\nimport { Body, Controller, Post } from '@nestjs/common';\nimport { CreateCourseDto } from './create-course.dto';\n\n@Controller('courses')\nexport class CoursesController {\n  @Post()\n  createCourse(@Body() createCourseDto: CreateCourseDto) {\n    return {\n      message: 'Course created',\n      data: createCourseDto,\n    };\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. Class Definition",
            "desc": "CreateCourseDto defines title and description as required string properties."
      },
      {
            "title": "2. Controller Usage",
            "desc": "createCourse(@Body() createCourseDto: CreateCourseDto) types the incoming payload."
      },
      {
            "title": "3. Single Source of Truth",
            "desc": "The DTO acts as the contract between the API consumer and the server handler."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Explicit Payload Contracts",
      "content": "Always define class-based DTOs for request bodies to ensure type safety and provide an anchor for validation decorators."
},
    cards: [
      {
            "number": "01",
            "tag": "CLASSES",
            "title": "Classes Over Interfaces",
            "description": "Classes exist at runtime in JavaScript, allowing NestJS validation libraries to inspect metadata.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "VALIDATION",
            "title": "Validation Ready",
            "description": "DTO properties can be annotated with validation rules like @IsEmail() and @MinLength().",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "DOCUMENT",
            "title": "Self-Documenting Code",
            "description": "New developers immediately see what payload fields an endpoint expects.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Working with DTOs in professional APIs:",
    points: [
      {
            "title": "1. Why Classes and Not Interfaces?",
            "content": "TypeScript interfaces vanish when compiled to JavaScript. Classes remain as real objects, so NestJS and validation pipes can inspect them at runtime."
      },
      {
            "title": "2. Naming Conventions",
            "content": "Use descriptive names like CreateCourseDto, UpdateUserDto, and LoginCredentialsDto."
      },
      {
            "title": "3. Stripping Extraneous Fields",
            "content": "When paired with ValidationPipe, DTOs allow NestJS to automatically strip malicious or unexpected fields sent by clients."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Using Raw Object Literals or any for Request Bodies",
      "code": "// Bad: Unclear request payload\n@Post()\ncreateCourse(@Body() body: any) {\n  // Nobody knows what fields body contains without reading the full method body\n  return this.service.create(body.title, body.desc);\n}",
      "explanation": "Using any provides zero compile-time checks and hides endpoint requirements."
},
    good: {
      "title": "Using a Typed DTO Class",
      "code": "// Clean: Explicit DTO contract\nexport class CreateCourseDto {\n  title!: string;\n  description!: string;\n}\n\n@Post()\ncreateCourse(@Body() dto: CreateCourseDto) {\n  return this.service.create(dto);\n}",
      "explanation": "DTOs make payloads predictable, typed, and easily validated."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect a DTO and controller endpoint:",
    starterCode: "export class RegisterUserDto {\n  username!: string;\n  email!: string;\n  age?: number;\n}\n\n// In NestJS:\n// @Post('register')\n// register(@Body() dto: RegisterUserDto) { ... }",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Why does NestJS recommend using TypeScript classes rather than interfaces for DTOs?",
      "options": [
            "Classes are preserved in compiled JavaScript, allowing runtime validation tools to inspect them",
            "Interfaces are deprecated in TypeScript",
            "Classes run faster on server CPUs than interfaces",
            "Interfaces cannot contain string properties"
      ],
      "correctIndex": 0,
      "explanation": "TypeScript interfaces are stripped during compilation. Classes remain in compiled JavaScript as constructor functions, allowing validation pipes to read metadata at runtime."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "DTO Contract",
            "desc": "DTOs define the expected schema for data crossing API boundaries."
      },
      {
            "title": "Class-Based",
            "desc": "NestJS uses classes so validation metadata persists into runtime."
      },
      {
            "title": "Safe & Typed",
            "desc": "Provides autocomplete and serves as the foundation for input validation."
      }
],
    nextLessonPreview: {
      "title": "Validation and Pipes",
      "desc": "Learn how to automatically validate DTO properties with ValidationPipe and class-validator."
},
  },
};
