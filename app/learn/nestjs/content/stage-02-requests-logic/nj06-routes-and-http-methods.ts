import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj06RoutesAndHttpMethodsContent: StandardLessonContent = {
  slug: "nj06-routes-and-http-methods",
  code: "NJ-06",
  title: "Routes and HTTP Methods",
  subtitle: "Connecting HTTP verbs (GET, POST, PUT, DELETE) and URL paths to controller methods.",
  difficulty: "Easy",
  scenario: {
    question: "The browser needs to retrieve all courses, not create one. Which method would normally fit?",
    answer: "`GET`, because the request is asking to read data.",
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
    title: "Routes and HTTP Methods",
    bigPicture: "A route connects an HTTP method and a URL to a controller method. The HTTP method tells the server what kind of action the client wants to perform.",
    analogy: "HTTP methods are like actions on a filing cabinet: GET pulls a folder to read, POST inserts a new folder, PUT replaces an existing folder, and DELETE shreds a folder.",
    codeSnippet: "@Controller('courses')\nexport class CoursesController {\n  @Get()\n  findAll() {\n    return 'Get all courses';\n  }\n\n  @Get(':id')\n  findOne() {\n    return 'Get one course';\n  }\n\n  @Post()\n  create() {\n    return 'Create a course';\n  }\n\n  @Put(':id')\n  update() {\n    return 'Update a course';\n  }\n\n  @Delete(':id')\n  remove() {\n    return 'Delete a course';\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. @Get()",
            "desc": "Handles GET requests to /courses to read all items."
      },
      {
            "title": "2. @Get(':id')",
            "desc": "Handles GET requests to /courses/:id to read a specific item."
      },
      {
            "title": "3. @Post()",
            "desc": "Handles POST requests to /courses to create a new item."
      },
      {
            "title": "4. @Put(':id')",
            "desc": "Handles PUT requests to update an existing item by ID."
      },
      {
            "title": "5. @Delete(':id')",
            "desc": "Handles DELETE requests to remove an item by ID."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "REST Method Convention Rule",
      "content": "Use standard HTTP methods that match the intent: GET to read, POST to create, PUT/PATCH to update, and DELETE to remove."
},
    cards: [
      {
            "number": "01",
            "tag": "GET",
            "title": "GET for Reading",
            "description": "Safe and idempotent; retrieves data without modifying server state.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "POST",
            "title": "POST for Creating",
            "description": "Sends request bodies to create new resources on the server.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "PUT_DELETE",
            "title": "PUT and DELETE for Mutations",
            "description": "Modifies or deletes specific existing records identified by route params.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Designing clear REST endpoints:",
    points: [
      {
            "title": "1. Consistent Resource Naming",
            "content": "Use plural nouns like /courses, /users, and /orders for the controller root."
      },
      {
            "title": "2. Automatic Status Codes",
            "content": "NestJS automatically responds with 200 OK for GET, PUT, DELETE, and 201 Created for POST."
      },
      {
            "title": "3. Custom Status with @HttpCode()",
            "content": "Use @HttpCode(HttpStatus.NO_CONTENT) when a DELETE endpoint returns no body."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Using GET to Delete or Mutate Resources",
      "code": "// Bad: Mutating server data with a GET request\n@Get('delete/:id')\ndeleteCourse(@Param('id') id: string) {\n  return this.service.remove(id);\n}",
      "explanation": "Web crawlers or browser pre-fetching can accidentally trigger destructive GET routes."
},
    good: {
      "title": "Using the Semantic DELETE Method",
      "code": "// Clean: Standard REST DELETE route\n@Delete(':id')\ndeleteCourse(@Param('id') id: string) {\n  return this.service.remove(id);\n}",
      "explanation": "Semantic HTTP verbs ensure client intent is explicit and prevents accidental deletions."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test a REST controller with GET and POST routes:",
    starterCode: "import { Controller, Get, Post } from '@nestjs/common';\n\n@Controller('lessons')\nexport class LessonsController {\n  @Get()\n  getLessons() {\n    return ['Lesson 1: What is NestJS?', 'Lesson 2: Controllers'];\n  }\n\n  @Post()\n  createLesson() {\n    return { created: true, id: 'new-id' };\n  }\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Which HTTP method is conventionally used to retrieve data from a server without modifying it?",
      "options": [
            "GET",
            "POST",
            "DELETE",
            "PUT"
      ],
      "correctIndex": 0,
      "explanation": "GET requests are used to read or fetch data from a server without altering server state."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "HTTP Methods",
            "desc": "Decorators like @Get(), @Post(), @Put(), @Delete() map HTTP verbs to methods."
      },
      {
            "title": "REST Conventions",
            "desc": "Use GET to read, POST to create, PUT to update, and DELETE to remove."
      },
      {
            "title": "Path Parameters",
            "desc": "Use :id in decorator paths to capture dynamic route values."
      }
],
    nextLessonPreview: {
      "title": "Route Parameters, Query Parameters, and Request Bodies",
      "desc": "Learn how to extract data from URLs, query strings, and incoming JSON bodies."
},
  },
};
