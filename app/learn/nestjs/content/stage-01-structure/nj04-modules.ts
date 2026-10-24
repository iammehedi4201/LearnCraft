import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj04ModulesContent: StandardLessonContent = {
  slug: "nj04-modules",
  code: "NJ-04",
  title: "Modules",
  subtitle: "A module groups related parts of an application, keeping feature domains clean and organized.",
  difficulty: "Moderate",
  scenario: {
    question: "Your application has users, courses, and payments. Why might you create a separate module for each feature?",
    answer: "Each module keeps closely related code together, making the project easier to understand and change.",
  },
  interviewQuestion: {
    question: "What is a NestJS module?",
    answer: "A module groups controllers and providers that belong to a feature and tells NestJS how those parts connect.",
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
    title: "Modules in NestJS",
    bigPicture: "A module groups related parts of an application. For example, a UsersModule can group user controllers and user services. Modules help keep a growing project organized.",
    analogy: "Think of modules like departments in a university. The Computer Science department has its own faculty (services) and student advisors (controllers). Other departments can collaborate by establishing official partnerships (imports/exports).",
    codeSnippet: "import { Module } from '@nestjs/common';\nimport { UsersController } from './users.controller';\nimport { UsersService } from './users.service';\n\n@Module({\n  controllers: [UsersController],\n  providers: [UsersService],\n})\nexport class UsersModule {}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. @Module()",
            "desc": "Attaches metadata that NestJS uses to organize the application structure."
      },
      {
            "title": "2. controllers array",
            "desc": "Lists controllers defined in this module that need to be instantiated."
      },
      {
            "title": "3. providers array",
            "desc": "Lists services that will be instantiated and made available for dependency injection."
      },
      {
            "title": "4. Export class",
            "desc": "UsersModule is exported so it can be imported into AppModule."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Feature Module Encapsulation",
      "content": "Group each domain feature (users, courses, billing) into its own module to keep code organized and decoupled."
},
    cards: [
      {
            "number": "01",
            "tag": "BOUNDARIES",
            "title": "Clear Feature Boundaries",
            "description": "Keeps related controllers, services, and models in one cohesive folder and module.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "EXPORTS",
            "title": "Controlled Sharing",
            "description": "Providers are private by default; explicitly export only the services other modules need.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "MAINTAINABLE",
            "title": "Easy Refactoring",
            "description": "Features can be added, updated, or extracted without breaking unrelated modules.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Working with modules in production:",
    points: [
      {
            "title": "1. The Root AppModule",
            "content": "AppModule imports all feature modules: @Module({ imports: [UsersModule, CoursesModule] })."
      },
      {
            "title": "2. Exporting Shared Services",
            "content": "If CoursesModule needs UsersService, UsersModule must list UsersService in its exports array."
      },
      {
            "title": "3. Preventing Circular Dependencies",
            "content": "Designing clean feature boundaries prevents circular dependencies between modules."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Registering Everything in Root AppModule",
      "code": "// Bad: Monolithic module with dozens of unrelated providers\n@Module({\n  controllers: [UsersController, CoursesController, OrdersController],\n  providers: [UsersService, CoursesService, OrdersService],\n})\nexport class AppModule {}",
      "explanation": "Failing to create feature modules causes sprawling, tightly-coupled files that are hard to navigate."
},
    good: {
      "title": "Organizing into Feature Modules",
      "code": "// Clean: AppModule only imports focused feature modules\n@Module({\n  imports: [UsersModule, CoursesModule, OrdersModule],\n})\nexport class AppModule {}",
      "explanation": "Each feature manages its own dependencies, keeping AppModule clean and declarative."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect a feature module with controllers and exported providers:",
    starterCode: "import { Module } from '@nestjs/common';\nimport { CoursesController } from './courses.controller';\nimport { CoursesService } from './courses.service';\n\n@Module({\n  controllers: [CoursesController],\n  providers: [CoursesService],\n  exports: [CoursesService], // Allow other modules to inject CoursesService\n})\nexport class CoursesModule {}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the primary benefit of organizing code into NestJS modules?",
      "options": [
            "It groups related controllers and providers into clean, maintainable feature blocks",
            "It automatically converts all TypeScript files into WebAssembly",
            "It replaces SQL queries with JSON documents",
            "It removes the need for tests"
      ],
      "correctIndex": 0,
      "explanation": "Modules group related controllers and providers together, organizing the application into maintainable domain blocks."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Modular Organization",
            "desc": "Modules group controllers and providers belonging to a feature."
      },
      {
            "title": "Private by Default",
            "desc": "Providers are private to a module unless explicitly exported."
      },
      {
            "title": "Root Composition",
            "desc": "AppModule imports feature modules to assemble the complete app."
      }
],
    nextLessonPreview: {
      "title": "Controllers",
      "desc": "Learn how controllers receive HTTP requests and route them to methods."
},
  },
};
