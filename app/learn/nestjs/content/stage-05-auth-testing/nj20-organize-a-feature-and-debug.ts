import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj20OrganizeAFeatureAndDebugContent: StandardLessonContent = {
  slug: "nj20-organize-a-feature-and-debug",
  code: "NJ-20",
  title: "Organize a Feature and Debug Common Problems",
  subtitle: "Structuring feature folders cleanly and diagnosing unresolvable dependencies or circular imports.",
  difficulty: "Moderate",
  scenario: {
    question: "NestJS says it cannot resolve a service used by a controller. What should you check first?",
    answer: "Check that the service is registered in a module's `providers` array and that the module imports and exports are correct if the service is shared across modules.",
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
    title: "Organize a Feature and Debug Common Problems",
    bigPicture: "A common NestJS pattern is to keep each feature's controller, service, DTOs, and module close together. The controller handles the request, the service contains the main work, DTOs describe incoming data, and the module connects the parts.",
    analogy: "Organizing a NestJS project is like a well-structured department store. Shoes, Sporting Goods, and Electronics each have their own dedicated department floor with their own stockroom, cashier, and staff. They don't scatter golf balls in the shoe department.",
    codeSnippet: "// Feature Folder Layout:\n// src/\n//   courses/\n//     dto/\n//       create-course.dto.ts\n//     courses.controller.ts\n//     courses.service.ts\n//     courses.module.ts\n//   app.module.ts\n//   main.ts\n\nimport { Module } from '@nestjs/common';\nimport { CoursesController } from './courses.controller';\nimport { CoursesService } from './courses.service';\n\n@Module({\n  controllers: [CoursesController],\n  providers: [CoursesService],\n  exports: [CoursesService], // Export if needed by other feature modules!\n})\nexport class CoursesModule {}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. Feature Cohesion",
            "desc": "Keep related controller, service, and DTO files in a dedicated feature directory (e.g. src/courses/)."
      },
      {
            "title": "2. Dedicated Feature Module",
            "desc": "CoursesModule registers CoursesController and CoursesService."
      },
      {
            "title": "3. Explicit exports Array",
            "desc": "Export CoursesService only if another feature module needs to inject it."
      },
      {
            "title": "4. AppModule Orchestration",
            "desc": "AppModule imports CoursesModule to include it in the overall app."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Feature Folder Organization Rule",
      "content": "Group files by domain feature (not by file type like \"all controllers in one folder\"). Keep controller, service, DTOs, and module together."
},
    cards: [
      {
            "number": "01",
            "tag": "FEATURE",
            "title": "Colocated Features",
            "description": "Everything belonging to \"courses\" lives in src/courses/, making it easy to find and modify.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "DEBUG",
            "title": "Debugging DI Errors",
            "description": "Diagnose \"Nest can't resolve dependencies\" by verifying providers, imports, and exports.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "CIRCULAR",
            "title": "Circular Dependency Fixes",
            "description": "Solve circular dependencies with forwardRef(() => Module) or by extracting shared services.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Top 3 debugging techniques for common NestJS errors:",
    points: [
      {
            "title": "1. \"Nest can't resolve dependencies of the Controller (?)\"",
            "content": "Look at the constructor of the controller: if index [0] is a question mark, either the service is not listed in providers, or the module importing it forgot to import the providing module."
      },
      {
            "title": "2. Circular Module References",
            "content": "If Module A imports Module B and Module B imports Module A, use forwardRef(() => ModuleB) on both sides or move shared logic to a CommonModule."
      },
      {
            "title": "3. Unexported Providers",
            "content": "Just importing a module is not enough; the target module must list the service in its exports array for other modules to see it."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Organizing by File Type across the Entire Project",
      "code": "// Bad: Flat architecture\nsrc/\n  controllers/\n    courses.controller.ts\n    users.controller.ts\n    orders.controller.ts\n  services/\n    courses.service.ts\n    ...",
      "explanation": "Scattering a single feature across distant folders makes changes tedious and increases coupling."
},
    good: {
      "title": "Domain Feature Folders",
      "code": "// Clean: Feature-centric architecture\nsrc/\n  courses/\n    courses.controller.ts\n    courses.service.ts\n    courses.module.ts\n  users/\n    users.controller.ts\n    ...",
      "explanation": "Grouping by feature keeps context local and simplifies modular architecture."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect a clean feature module with export capabilities:",
    starterCode: "import { Module } from '@nestjs/common';\nimport { UsersController } from './users.controller';\nimport { UsersService } from './users.service';\n\n@Module({\n  controllers: [UsersController],\n  providers: [UsersService],\n  exports: [UsersService], // Shared with AuthModule and OrdersModule\n})\nexport class UsersModule {}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "When NestJS displays \"Nest can't resolve dependencies of X\", what is the most common cause?",
      "options": [
            "A required service is missing from the module's providers array, or the exporting module was not imported",
            "The computer has run out of RAM",
            "The browser closed unexpectedly",
            "The package.json file was deleted"
      ],
      "correctIndex": 0,
      "explanation": "This error occurs when the IoC container cannot find a provider matching the constructor token, typically because it was omitted from providers or exports."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Feature Modularity",
            "desc": "Group controllers, services, DTOs, and modules by domain feature."
      },
      {
            "title": "Dependency Resolution",
            "desc": "Ensure providers are registered in providers and shared via exports."
      },
      {
            "title": "Solid Foundation",
            "desc": "You now understand the complete architecture of NestJS applications!"
      }
],
    nextLessonPreview: {
      "title": "NestJS Curriculum Complete",
      "desc": "Congratulations! You have mastered the 20 core concepts of NestJS architecture, routing, validation, and lifecycle."
},
  },
};
