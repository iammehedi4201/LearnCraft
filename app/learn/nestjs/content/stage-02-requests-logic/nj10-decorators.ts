import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj10DecoratorsContent: StandardLessonContent = {
  slug: "nj10-decorators",
  code: "NJ-10",
  title: "Decorators",
  subtitle: "Decorators give NestJS information about classes, methods, and parameters.",
  difficulty: "Moderate",
  scenario: {
    question: "You see `@Post()` above a controller method. What does it tell you?",
    answer: "The method handles a POST request for the route defined by the controller and any route path on the decorator.",
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
    title: "Decorators",
    bigPicture: "Decorators such as @Controller(), @Get(), and @Injectable() give NestJS information about your classes or methods. NestJS uses that information to connect routes and manage providers.",
    analogy: "Decorators are like sticky notes placed on folders. A note marked \"Urgent\" or \"Accounting\" tells the mail clerk where the folder belongs without modifying the papers inside.",
    codeSnippet: "import { Controller, Get, Injectable, Param } from '@nestjs/common';\n\n@Injectable()\nexport class CoursesService {}\n\n@Controller('courses')\nexport class CoursesController {\n  @Get(':id')\n  getCourse(@Param('id') id: string) {\n    return { id };\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. Class Decorators",
            "desc": "@Injectable() and @Controller() attach metadata to entire classes."
      },
      {
            "title": "2. Method Decorators",
            "desc": "@Get(':id') attaches routing metadata to the method."
      },
      {
            "title": "3. Parameter Decorators",
            "desc": "@Param('id') tells NestJS to pull the id route parameter from the request and pass it to the id argument."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Declarative Metadata Rule",
      "content": "Use decorators to describe what your code is and how it connects, keeping implementation code clean and expressive."
},
    cards: [
      {
            "number": "01",
            "tag": "DECLARATIVE",
            "title": "Declarative Syntax",
            "description": "Decorators clearly express route intent right above the method definition.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "TYPES",
            "title": "Three Levels",
            "description": "Applies at the class level (@Controller), method level (@Get), and parameter level (@Body).",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "METADATA",
            "title": "Metadata Storage",
            "description": "Stores metadata that NestJS's runtime reads to configure the HTTP pipeline.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Using decorators effectively:",
    points: [
      {
            "title": "1. Reading Request Data Cleanly",
            "content": "Parameter decorators like @Body(), @Query(), @Param(), and @Headers() replace manual req.body access."
      },
      {
            "title": "2. Setting Response Headers",
            "content": "Use @HttpCode(204) or @Header('Cache-Control', 'none') to configure response details declaratively."
      },
      {
            "title": "3. Custom Decorators",
            "content": "NestJS lets you build custom decorators like @CurrentUser() to extract the logged-in user from requests."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Manually Parsing req in NestJS Methods",
      "code": "// Bad: Bypassing NestJS decorators with raw req access\n@Get(':id')\ngetUser(@Req() req: any) {\n  const id = req.params.id;\n  const token = req.headers.authorization;\n  return { id, token };\n}",
      "explanation": "Relying on raw request objects makes code harder to read, type, and test."
},
    good: {
      "title": "Using Idiomatic Parameter Decorators",
      "code": "// Clean: Idiomatic NestJS parameter decorators\n@Get(':id')\ngetUser(\n  @Param('id') id: string,\n  @Headers('authorization') token: string\n) {\n  return { id, token };\n}",
      "explanation": "Parameter decorators provide clean types and isolate what the method actually needs."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Observe parameter and method decorators together:",
    starterCode: "import { Controller, Get, Param, HttpCode } from '@nestjs/common';\n\n@Controller('users')\nexport class UsersController {\n  @Get(':username')\n  @HttpCode(200)\n  findUser(@Param('username') username: string) {\n    return { username, active: true };\n  }\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the purpose of the @Param(\"id\") decorator on a method argument?",
      "options": [
            "It extracts the \"id\" route parameter from the incoming request URL",
            "It encrypts the id with SHA-256",
            "It tells the database to delete the id parameter",
            "It compiles the id into an HTML template"
      ],
      "correctIndex": 0,
      "explanation": "@Param(\"id\") extracts the URL parameter named \"id\" and supplies its value to the decorated method argument."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Metadata Mechanism",
            "desc": "Decorators supply runtime instructions to NestJS without polluting logic."
      },
      {
            "title": "Three Decorator Kinds",
            "desc": "Class decorators (@Controller), method decorators (@Get), and parameter decorators (@Param)."
      },
      {
            "title": "Declarative Code",
            "desc": "Keeps backend route definitions expressive and concise."
      }
],
    nextLessonPreview: {
      "title": "DTOs (Data Transfer Objects)",
      "desc": "Learn how DTOs define input shapes and contracts for client requests."
},
  },
};
