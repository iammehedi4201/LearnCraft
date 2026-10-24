import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj05ControllersContent: StandardLessonContent = {
  slug: "nj05-controllers",
  code: "NJ-05",
  title: "Controllers",
  subtitle: "A controller receives HTTP requests and decides which method should handle them.",
  difficulty: "Easy",
  scenario: {
    question: "A controller contains 200 lines of business rules. What is a useful improvement?",
    answer: "Move most of the business rules into a service. Keep the controller focused on handling the request and returning the result.",
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
    title: "Controllers",
    bigPicture: "A controller receives HTTP requests and decides which method should handle them. It should usually pass business work to a service instead of doing everything itself.",
    analogy: "Think of a controller as an air traffic controller at an airport. It doesn't fly the airplanes (business logic) or pump the fuel (database); it simply directs incoming airplanes to the correct runways and gates.",
    codeSnippet: "import { Controller, Get } from '@nestjs/common';\n\n@Controller('courses')\nexport class CoursesController {\n  @Get()\n  findAll() {\n    return ['React', 'Next.js', 'NestJS'];\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. @Controller('courses')",
            "desc": "Sets /courses as the base route path for all methods in the class."
      },
      {
            "title": "2. @Get() decorator",
            "desc": "Maps HTTP GET requests sent to /courses to the findAll() method."
      },
      {
            "title": "3. Handler return value",
            "desc": "NestJS takes the returned array and sends it as a 200 OK JSON response."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Thin Controller Rule",
      "content": "Controllers should be thin coordinators: parse inputs, invoke domain services, and return responses."
},
    cards: [
      {
            "number": "01",
            "tag": "ROUTING",
            "title": "Route Coordination",
            "description": "Maps URLs and HTTP verbs directly to class methods using declarative decorators.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "CLEAN",
            "title": "Separation of Concerns",
            "description": "Separates HTTP request-handling from core application calculations and database queries.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "SERIALIZE",
            "title": "Automatic JSON",
            "description": "Objects and arrays returned from methods are serialized to JSON automatically.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Best practices for controller design:",
    points: [
      {
            "title": "1. RESTful Paths",
            "content": "Prefix controllers with the resource noun (e.g., @Controller('products'), @Controller('users'))."
      },
      {
            "title": "2. Sub-routes on Decorators",
            "content": "You can add sub-paths to method decorators like @Get('active') to handle /courses/active."
      },
      {
            "title": "3. Injecting Services",
            "content": "Inject services through the constructor to let the service do data lookups and validation."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Writing Database Queries Inside Controllers",
      "code": "@Controller('courses')\nexport class BadCoursesController {\n  @Get()\n  async getCourses() {\n    // Bad: Direct database query in controller\n    const db = await connectToDatabase();\n    return db.query('SELECT * FROM courses WHERE active = true');\n  }\n}",
      "explanation": "Coupling controllers directly to database queries prevents unit testing and code reuse."
},
    good: {
      "title": "Injecting and Calling a Service",
      "code": "@Controller('courses')\nexport class CleanCoursesController {\n  constructor(private readonly coursesService: CoursesService) {}\n\n  @Get()\n  getCourses() {\n    return this.coursesService.findActiveCourses();\n  }\n}",
      "explanation": "The service encapsulates the data fetching, keeping the controller lightweight."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test a simple courses controller:",
    starterCode: "import { Controller, Get } from '@nestjs/common';\n\n@Controller('courses')\nexport class CoursesController {\n  @Get()\n  findAll() {\n    return [\n      { id: '1', title: 'NestJS Fundamentals' },\n      { id: '2', title: 'TypeScript Deep Dive' },\n    ];\n  }\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "What is the main role of a controller in a NestJS application?",
      "options": [
            "To handle incoming HTTP requests and return responses",
            "To compile Sass styles into minified CSS",
            "To format SQL tables directly on disk",
            "To manage frontend browser state"
      ],
      "correctIndex": 0,
      "explanation": "Controllers handle HTTP requests, route them to appropriate methods, and return responses to the client."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "HTTP Entry Point",
            "desc": "Controllers receive incoming network requests and route them to methods."
      },
      {
            "title": "Thin Handlers",
            "desc": "Pass business rules and database work to dedicated services."
      },
      {
            "title": "Route Prefix",
            "desc": "Decorators like @Controller('courses') group endpoints cleanly."
      }
],
    nextLessonPreview: {
      "title": "Routes and HTTP Methods",
      "desc": "Explore GET, POST, PUT, and DELETE decorators for building RESTful endpoints."
},
  },
};
