import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj01WhatIsNestjsContent: StandardLessonContent = {
  slug: "nj01-what-is-nestjs",
  code: "NJ-01",
  title: "What Is NestJS?",
  subtitle: "NestJS is a framework for building server-side applications with Node.js using modules, controllers, and providers.",
  difficulty: "Easy",
  scenario: {
    question: "You need an endpoint that returns a welcome message. Which part should handle the HTTP request?",
    answer: "A controller should handle the request and return the response. For a larger feature, it can call a service to do the work.",
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
    title: "What Is NestJS?",
    bigPicture: "NestJS is a framework for building server-side applications with Node.js. It gives your code a clear structure using modules, controllers, and providers (often services). A client sends a request, NestJS finds the controller that handles it, and the application sends a response.",
    analogy: "Think of NestJS as an organized restaurant kitchen. The client is a guest placing an order. The controller is the front waiter taking the order, the service is the head chef preparing the dish, and the module is the kitchen department keeping everything running smoothly.",
    codeSnippet: "import { Controller, Get, Module } from '@nestjs/common';\nimport { NestFactory } from '@nestjs/core';\n\n@Controller()\nclass AppController {\n  @Get('hello')\n  sayHello() {\n    return { message: 'Hello from NestJS' };\n  }\n}\n\n@Module({ controllers: [AppController] })\nclass AppModule {}\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  await app.listen(3000);\n}\n\nbootstrap();",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. @Controller()",
            "desc": "Marks a class that handles requests."
      },
      {
            "title": "2. @Get('hello')",
            "desc": "Connects a GET request to /hello to sayHello()."
      },
      {
            "title": "3. Return Object",
            "desc": "The method returns an object. NestJS sends it as a JSON response."
      },
      {
            "title": "4. AppModule",
            "desc": "AppModule registers the controller so NestJS can use it."
      },
      {
            "title": "5. bootstrap()",
            "desc": "bootstrap() starts the server on port 3000."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Structured Backend Simplicity",
      "content": "Use NestJS when you want a clear, consistent structure for Node.js backends without inventing your own architectural conventions."
},
    cards: [
      {
            "number": "01",
            "tag": "STRUCTURE",
            "title": "Organized from Day One",
            "description": "Gives your application a clean pattern of controllers, services, and modules out of the box.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "TYPESCRIPT",
            "title": "TypeScript Native",
            "description": "Built with TypeScript for type safety, autocomplete, and fewer runtime errors.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "SCALABILITY",
            "title": "Grows with Your Team",
            "description": "Clear architectural boundaries make large codebases maintainable for multiple developers.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Understanding how NestJS handles requests in real projects:",
    points: [
      {
            "title": "1. Single Responsibility",
            "content": "Keep controllers thin: receive parameters, call a service for calculations or database work, and return the response."
      },
      {
            "title": "2. Teaching vs. Production Files",
            "content": "Teaching examples combine classes in one file for clarity. Real projects keep each controller, service, and module in its own file."
      },
      {
            "title": "3. Standardized Error Handling",
            "content": "NestJS catches unhandled errors and turns them into clean HTTP responses automatically."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Mixing Business Calculations in the Controller",
      "code": "@Controller('welcome')\nexport class BadWelcomeController {\n  @Get()\n  getWelcome() {\n    // Bad: Complex business calculation directly inside controller\n    const userRole = 'admin';\n    const discount = userRole === 'admin' ? 0.2 : 0;\n    return { discount };\n  }\n}",
      "explanation": "Putting business logic directly inside controllers makes testing and reusability difficult."
},
    good: {
      "title": "Delegating to a Service",
      "code": "@Controller('welcome')\nexport class CleanWelcomeController {\n  constructor(private readonly welcomeService: WelcomeService) {}\n\n  @Get()\n  getWelcome() {\n    return this.welcomeService.getDiscountForUser();\n  }\n}",
      "explanation": "Controllers should only coordinate incoming requests and delegate work to services."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test a minimal NestJS controller and module setup:",
    starterCode: "import { Controller, Get, Module } from '@nestjs/common';\n\n@Controller('ping')\nexport class PingController {\n  @Get()\n  ping() {\n    return { status: 'ok', timestamp: Date.now() };\n  }\n}\n\n@Module({\n  controllers: [PingController],\n})\nexport class PingModule {}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Which component in NestJS is directly responsible for handling incoming HTTP requests?",
      "options": [
            "Controller",
            "Database Driver",
            "Compiler",
            "Package Manager"
      ],
      "correctIndex": 0,
      "explanation": "Controllers in NestJS receive incoming HTTP requests, map them to route handlers, and return responses."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Server Framework",
            "desc": "NestJS is a structured framework for building Node.js server applications."
      },
      {
            "title": "Three Core Concepts",
            "desc": "Modules, controllers, and providers give code a clear, predictable shape."
      },
      {
            "title": "Controller Role",
            "desc": "Controllers receive client requests and return responses."
      }
],
    nextLessonPreview: {
      "title": "TypeScript Basics You Need for NestJS",
      "desc": "Review classes, types, async/await, and decorators needed to build NestJS apps."
},
  },
};
