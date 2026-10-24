import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj09DependencyInjectionContent: StandardLessonContent = {
  slug: "nj09-dependency-injection",
  code: "NJ-09",
  title: "Dependency Injection",
  subtitle: "NestJS provides a class with the other objects it needs without manual instantiation.",
  difficulty: "Difficult",
  scenario: {
    question: "NestJS reports that it cannot resolve `CoursesService` in a controller. What should you check?",
    answer: "Check that the service is listed in the right module's `providers` array and that the module is imported correctly if the service belongs to another module.",
  },
  interviewQuestion: {
    question: "What is dependency injection?",
    answer: "It is a way for NestJS to supply a class with the dependencies it needs instead of the class creating them itself.",
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
    title: "Dependency Injection",
    bigPicture: "Dependency injection (DI) means NestJS provides a class with the other objects it needs. You do not have to create each service yourself in every controller.",
    analogy: "Imagine ordering a meal at a restaurant. You don't walk into the kitchen to hire cooks, buy produce, or build a stove; the restaurant supplies the prepared meal directly to your table.",
    codeSnippet: "import { Controller, Get, Injectable, Module } from '@nestjs/common';\n\n@Injectable()\nclass CoursesService {\n  findAll() {\n    return ['React', 'Next.js', 'NestJS'];\n  }\n}\n\n@Controller('courses')\nclass CoursesController {\n  constructor(private readonly coursesService: CoursesService) {}\n\n  @Get()\n  getAll() {\n    return this.coursesService.findAll();\n  }\n}\n\n@Module({\n  controllers: [CoursesController],\n  providers: [CoursesService],\n})\nexport class CoursesModule {}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. @Injectable() provider",
            "desc": "Marks CoursesService as eligible for injection."
      },
      {
            "title": "2. Constructor injection",
            "desc": "CoursesController declares private readonly coursesService: CoursesService in its constructor."
      },
      {
            "title": "3. Automatic resolution",
            "desc": "When creating CoursesController, NestJS inspects the constructor type and supplies the CoursesService instance."
      },
      {
            "title": "4. Module wiring",
            "desc": "CoursesModule registers CoursesController under controllers and CoursesService under providers."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "IoC Container Rule",
      "content": "Declare dependencies in the constructor and let NestJS resolve them. Register all providers in the module."
},
    cards: [
      {
            "number": "01",
            "tag": "DECOUPLING",
            "title": "Loose Coupling",
            "description": "Classes do not instantiate their own dependencies, making them flexible and easy to swap.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "TESTING",
            "title": "Effortless Testing",
            "description": "In unit tests, you can inject a mock service without touching the real database or network.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "SINGLETON",
            "title": "Singleton Sharing",
            "description": "The same service instance is shared across classes, conserving memory and coordinating state.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Diagnosing dependency injection problems:",
    points: [
      {
            "title": "1. \"Nest can't resolve dependencies\"",
            "content": "This common error means a service in a constructor is not listed in the module's providers array."
      },
      {
            "title": "2. Cross-Module Injection",
            "content": "If Controller A needs Service B from Module B, Module B must export Service B, and Module A must import Module B."
      },
      {
            "title": "3. Inversion of Control (IoC)",
            "content": "Control is inverted: the framework is in charge of creating and wiring objects, not your classes."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Forgetting to Add Service to Providers Array",
      "code": "// Bad: Service not registered in module\n@Module({\n  controllers: [CoursesController],\n  providers: [], // Missing CoursesService! NestJS will crash on boot\n})\nexport class BadCoursesModule {}",
      "explanation": "If a service is omitted from the providers array, NestJS cannot locate it to inject into the controller."
},
    good: {
      "title": "Registering Service in Providers Array",
      "code": "// Clean: Service properly registered\n@Module({\n  controllers: [CoursesController],\n  providers: [CoursesService],\n})\nexport class CleanCoursesModule {}",
      "explanation": "Listing the service under providers lets NestJS instantiate and inject it without errors."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Observe constructor dependency injection in action:",
    starterCode: "import { Injectable, Controller } from '@nestjs/common';\n\n@Injectable()\nexport class LoggerService {\n  log(msg: string) { console.log(`[LOG]: ${msg}`); }\n}\n\n@Controller('audit')\nexport class AuditController {\n  // NestJS automatically injects LoggerService instance\n  constructor(private readonly logger: LoggerService) {}\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "How does NestJS know which provider instance to pass to a class constructor?",
      "options": [
            "It inspects the TypeScript type annotation on the constructor parameter",
            "It searches random files in the project directory",
            "It asks the client browser via WebSockets",
            "It generates random UUIDs for all variables"
      ],
      "correctIndex": 0,
      "explanation": "NestJS reads the TypeScript type metadata on constructor parameters to resolve and inject the matching provider."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "IoC Principle",
            "desc": "NestJS manages and supplies dependencies instead of classes instantiating them."
      },
      {
            "title": "Constructor Injection",
            "desc": "Declare dependencies as constructor parameters with type annotations."
      },
      {
            "title": "Module Registration",
            "desc": "Always list providers in the module's providers array."
      }
],
    nextLessonPreview: {
      "title": "Decorators",
      "desc": "Understand how @Controller, @Injectable, and parameter decorators work in NestJS."
},
  },
};
