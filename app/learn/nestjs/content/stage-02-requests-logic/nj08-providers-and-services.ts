import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj08ProvidersAndServicesContent: StandardLessonContent = {
  slug: "nj08-providers-and-services",
  code: "NJ-08",
  title: "Providers and Services",
  subtitle: "A provider is an injectable class NestJS creates and supplies to controllers.",
  difficulty: "Easy",
  scenario: {
    question: "Both the website and an admin route need the same course-list logic. Where should that shared logic usually live?",
    answer: "Put it in a service so both controllers can use the same code.",
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
    title: "Providers and Services",
    bigPicture: "A provider is a class NestJS can create and supply when another class needs it. A service is a common kind of provider. Services often contain business logic or work with data.",
    analogy: "Think of a service like an engine mechanic. The driver (controller) turns the ignition switch, but the mechanic (service) knows how the engine pistons and spark plugs operate under the hood.",
    codeSnippet: "import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class CoursesService {\n  findAll() {\n    return ['React', 'Next.js', 'NestJS'];\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. @Injectable()",
            "desc": "Marks the class as a provider that NestJS's Dependency Injection container can manage."
      },
      {
            "title": "2. CoursesService",
            "desc": "A standard TypeScript class containing application and business methods."
      },
      {
            "title": "3. findAll() method",
            "desc": "Encapsulates data retrieval logic away from any HTTP details."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Business Logic Placement Rule",
      "content": "Put business logic, data calculations, and external API requests inside services, never inside controllers."
},
    cards: [
      {
            "number": "01",
            "tag": "REUSABLE",
            "title": "Reusable Logic",
            "description": "A single service can be injected into multiple controllers or other services.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "TESTABLE",
            "title": "Isolated Unit Testing",
            "description": "Services can be tested in pure isolation without mocking entire HTTP servers.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "INJECTABLE",
            "title": "Managed Lifecycle",
            "description": "NestJS handles creating, sharing, and disposing of service instances automatically.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Benefits of services in production:",
    points: [
      {
            "title": "1. Centralized Business Rules",
            "content": "If pricing or discount rules change, you update one service rather than 10 different route handlers."
      },
      {
            "title": "2. Database Integration",
            "content": "Services query databases, format records, and return clean domain objects to controllers."
      },
      {
            "title": "3. Singletons by Default",
            "content": "NestJS creates one instance of each provider per application by default, saving memory and resources."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Manually Creating Services with new",
      "code": "// Bad: Creating service manually inside controller\n@Controller('courses')\nexport class BadCoursesController {\n  private service = new CoursesService(); // Hardcoded instantiation!\n}",
      "explanation": "Calling new manually prevents NestJS from managing dependencies and breaks unit testing mocks."
},
    good: {
      "title": "Using NestJS Dependency Injection",
      "code": "// Clean: Service injected via constructor\n@Controller('courses')\nexport class CleanCoursesController {\n  constructor(private readonly coursesService: CoursesService) {}\n}",
      "explanation": "Letting NestJS inject the service decouples the classes and simplifies testing."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test an Injectable service class:",
    starterCode: "import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class CalculatorService {\n  add(a: number, b: number): number {\n    return a + b;\n  }\n}\n\n// In NestJS, controllers inject CalculatorService to perform calculations.",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Which decorator must be added to a class to make it a NestJS provider that can be injected?",
      "options": [
            "@Injectable()",
            "@Controller()",
            "@Module()",
            "@Get()"
      ],
      "correctIndex": 0,
      "explanation": "@Injectable() attaches the metadata required for the NestJS IoC container to instantiate and inject the provider."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Provider Concept",
            "desc": "Providers are classes that can be injected as dependencies."
      },
      {
            "title": "Service Role",
            "desc": "Services encapsulate business rules and database operations."
      },
      {
            "title": "Injectable Decorator",
            "desc": "Decorate service classes with @Injectable() to enable injection."
      }
],
    nextLessonPreview: {
      "title": "Dependency Injection",
      "desc": "Learn how NestJS connects controllers and services automatically."
},
  },
};
