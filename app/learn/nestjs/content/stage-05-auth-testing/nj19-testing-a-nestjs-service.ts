import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj19TestingANestjsServiceContent: StandardLessonContent = {
  slug: "nj19-testing-a-nestjs-service",
  code: "NJ-19",
  title: "Testing a NestJS Service",
  subtitle: "Unit tests check a service's behavior in isolation without starting the whole HTTP server.",
  difficulty: "Moderate",
  scenario: {
    question: "You changed a service and want to check that it still returns the right message. What is a simple test you can write?",
    answer: "Call the service with a known name and check that the returned text is exactly what you expect.",
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
    title: "Testing a NestJS Service",
    bigPicture: "A test checks that code behaves as expected. Unit tests can check a service without starting the whole application. NestJS provides testing utilities to create a small testing module.",
    analogy: "Testing a service is like testing a watch battery on a workbench meter. You don't have to assemble the entire watch, case, and strap to verify the battery produces 1.5 volts; you test the component in isolated simplicity.",
    codeSnippet: "// greeting.service.ts\nimport { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class GreetingService {\n  sayHello(name: string) {\n    return `Hello, ${name}!`;\n  }\n}\n\n// greeting.service.spec.ts\nimport { Test, TestingModule } from '@nestjs/testing';\nimport { GreetingService } from './greeting.service';\n\ndescribe('GreetingService', () => {\n  let service: GreetingService;\n\n  beforeEach(async () => {\n    const module: TestingModule = await Test.createTestingModule({\n      providers: [GreetingService],\n    }).compile();\n\n    service = module.get<GreetingService>(GreetingService);\n  });\n\n  it('should return a greeting', () => {\n    expect(service.sayHello('Rina')).toBe('Hello, Rina!');\n  });\n});",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. Test.createTestingModule()",
            "desc": "Builds an isolated dependency injection container strictly for the test."
      },
      {
            "title": "2. module.compile()",
            "desc": "Initializes providers and resolves dependencies in memory."
      },
      {
            "title": "3. module.get<GreetingService>()",
            "desc": "Retrieves the compiled instance of the service under test."
      },
      {
            "title": "4. expect().toBe()",
            "desc": "Asserts that calling the service method produces the expected return string."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Isolated Unit Testing Rule",
      "content": "Test services in isolation using Test.createTestingModule(). Mock external databases and HTTP calls to keep unit tests lightning fast."
},
    cards: [
      {
            "number": "01",
            "tag": "SPEED",
            "title": "Sub-Second Execution",
            "description": "Unit tests run in milliseconds without launching network ports or database connections.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "MOCKS",
            "title": "Mocked Dependencies",
            "description": "Easily swap out database repositories or external APIs with mock objects.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "CONFIDENCE",
            "title": "Refactoring Safety",
            "description": "Refactor complex business rules with confidence that existing behavior remains intact.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Writing effective NestJS tests:",
    points: [
      {
            "title": "1. Mocking Injected Providers",
            "content": "Provide mocks via { provide: DatabaseService, useValue: { findUser: vi.fn() } } inside createTestingModule."
      },
      {
            "title": "2. Testing Exception Scenarios",
            "content": "Verify that invalid inputs cause expected exceptions: expect(() => service.findById('99')).toThrow(NotFoundException)."
      },
      {
            "title": "3. Vitest & Jest Support",
            "content": "NestJS testing utilities work seamlessly with both Jest and Vitest runners."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Starting the Full HTTP App for Simple Unit Tests",
      "code": "// Bad: Heavy E2E setup for a basic unit test\nbeforeAll(async () => {\n  const app = await NestFactory.create(AppModule); // Starts full DB and all modules\n  await app.listen(3000);\n});",
      "explanation": "Booting the entire application makes tests slow and fragile."
},
    good: {
      "title": "Using Test.createTestingModule()",
      "code": "// Clean: Lightweight testing module with only the target service\nconst module = await Test.createTestingModule({\n  providers: [GreetingService],\n}).compile();\nconst service = module.get(GreetingService);",
      "explanation": "Testing only the needed service makes the test run in milliseconds."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect a unit test for a service:",
    starterCode: "import { Test } from '@nestjs/testing';\nimport { CalculatorService } from './calculator.service';\n\ndescribe('CalculatorService', () => {\n  it('adds two numbers correctly', async () => {\n    const module = await Test.createTestingModule({\n      providers: [CalculatorService],\n    }).compile();\n\n    const service = module.get<CalculatorService>(CalculatorService);\n    expect(service.add(2, 3)).toBe(5);\n  });\n});",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the primary advantage of using Test.createTestingModule() when testing a service?",
      "options": [
            "It creates an isolated in-memory NestJS container without booting the entire server or connecting to real network ports",
            "It automatically deploys the app to AWS",
            "It converts TypeScript tests into Python scripts",
            "It writes the tests automatically without developer input"
      ],
      "correctIndex": 0,
      "explanation": "Test.createTestingModule() creates a lightweight, isolated dependency injection container in memory for fast unit testing."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Isolated Verification",
            "desc": "Unit tests verify business logic without starting the full HTTP server."
      },
      {
            "title": "Test.createTestingModule",
            "desc": "Creates an in-memory testing container for services."
      },
      {
            "title": "Mocking Dependencies",
            "desc": "Swap real databases and services with mocks for deterministic tests."
      }
],
    nextLessonPreview: {
      "title": "Organize a Feature and Debug Common Problems",
      "desc": "Learn standard feature folder structures and how to debug circular dependencies and missing providers."
},
  },
};
