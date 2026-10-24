import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj13HandlingErrorsContent: StandardLessonContent = {
  slug: "nj13-handling-errors",
  code: "NJ-13",
  title: "Handling Errors",
  subtitle: "Return suitable HTTP errors using NestJS built-in exceptions like NotFoundException.",
  difficulty: "Moderate",
  scenario: {
    question: "A client requests course ID `99`, but no such course exists. What response should the service cause?",
    answer: "A 404 Not Found response, for example by throwing `NotFoundException`.",
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
    title: "Handling Errors",
    bigPicture: "When a request cannot be completed, return a suitable HTTP error instead of pretending it succeeded. NestJS provides built-in exceptions such as NotFoundException and BadRequestException.",
    analogy: "Imagine a package delivery service. If an address does not exist, the carrier returns a formal \"Return to Sender: Address Unknown\" notice (404), rather than pretending the package was delivered successfully.",
    codeSnippet: "import { Injectable, NotFoundException } from '@nestjs/common';\n\n@Injectable()\nexport class CoursesService {\n  private courses = [{ id: '1', title: 'NestJS Basics' }];\n\n  findById(id: string) {\n    const course = this.courses.find((item) => item.id === id);\n    if (!course) {\n      throw new NotFoundException(`Course with ID ${id} was not found`);\n    }\n    return course;\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. NotFoundException",
            "desc": "Imported from @nestjs/common; maps to HTTP status 404."
      },
      {
            "title": "2. Throwing the exception",
            "desc": "When the course is not found, throwing the exception stops execution immediately."
      },
      {
            "title": "3. Automatic JSON response",
            "desc": "NestJS catches the exception and returns { \"statusCode\": 404, \"message\": \"Course with ID 99 was not found\", \"error\": \"Not Found\" }."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Explicit HTTP Exceptions Rule",
      "content": "Throw specific NestJS HTTP exceptions when requests cannot be fulfilled. Never return null or error objects disguised as 200 OK."
},
    cards: [
      {
            "number": "01",
            "tag": "BUILTIN",
            "title": "Built-in Exceptions",
            "description": "Includes BadRequestException (400), UnauthorizedException (401), ForbiddenException (403), NotFoundException (404).",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "FORMAT",
            "title": "Standardized Error Shape",
            "description": "NestJS formats all exceptions into a consistent JSON body with statusCode, message, and error.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "SAFETY",
            "title": "Unhandled Protection",
            "description": "Unexpected code crashes are safely transformed into 500 Internal Server Error without leaking internal stack traces.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Handling common error scenarios:",
    points: [
      {
            "title": "1. Throw in Services or Controllers?",
            "content": "You can throw exceptions in services as soon as a domain condition fails (e.g. user not found). NestJS bubbles it up to the HTTP layer."
      },
      {
            "title": "2. Custom Error Messages",
            "content": "Pass clear text to exceptions: new ConflictException('An account with this email already exists')."
      },
      {
            "title": "3. Exception Filters",
            "content": "For customized error schemas, NestJS provides Exception Filters that can intercept and reformat error responses."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Returning Error Objects with 200 OK Status",
      "code": "// Bad: Disguising failure as success\nfindById(id: string) {\n  const course = this.courses.find(c => c.id === id);\n  if (!course) {\n    return { success: false, error: 'Not found' }; // Still responds 200 OK!\n  }\n  return course;\n}",
      "explanation": "Returning errors with a 200 OK status confuses client applications and HTTP caches."
},
    good: {
      "title": "Throwing Proper HTTP Exceptions",
      "code": "// Clean: Semantic HTTP status code\nfindById(id: string) {\n  const course = this.courses.find(c => c.id === id);\n  if (!course) {\n    throw new NotFoundException(`Course ${id} not found`);\n  }\n  return course;\n}",
      "explanation": "Throwing NotFoundException sends a genuine 404 status that HTTP clients can handle predictably."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test throwing built-in NestJS exceptions:",
    starterCode: "import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';\n\n@Injectable()\nexport class UserService {\n  validateAge(age: number) {\n    if (age < 18) {\n      throw new BadRequestException('User must be at least 18 years old');\n    }\n    return { valid: true };\n  }\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "When a service throws new NotFoundException(\"User not found\"), what HTTP status code does NestJS return to the client?",
      "options": [
            "404 Not Found",
            "200 OK",
            "500 Internal Server Error",
            "301 Moved Permanently"
      ],
      "correctIndex": 0,
      "explanation": "NotFoundException maps directly to HTTP status code 404 Not Found."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Built-in Exceptions",
            "desc": "NestJS provides standard exceptions for all common HTTP error codes."
      },
      {
            "title": "Standard JSON Shape",
            "desc": "Generates consistent error responses with status, message, and error name."
      },
      {
            "title": "Fail Early",
            "desc": "Throw exceptions directly inside services or controllers when validation or lookups fail."
      }
],
    nextLessonPreview: {
      "title": "Middleware",
      "desc": "Learn how middleware executes before route handlers for logging and header inspection."
},
  },
};
