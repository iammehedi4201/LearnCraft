import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj07ParametersAndRequestBodiesContent: StandardLessonContent = {
  slug: "nj07-parameters-and-request-bodies",
  code: "NJ-07",
  title: "Route Parameters, Query Parameters, and Request Bodies",
  subtitle: "Extracting data with @Param, @Query, and @Body parameter decorators.",
  difficulty: "Moderate",
  scenario: {
    question: "You need `/courses/12` to identify a course and `?view=short` to choose how much detail to show. Which values should you read?",
    answer: "Read `12` with `@Param('id')` and `short` with `@Query('view')`.",
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
    title: "Route Parameters, Query Parameters, and Request Bodies",
    bigPicture: "These are three common ways for a request to send information: Route parameter (part of the URL path, often used to identify one item), Query parameter (extra information after ?, often used for search or filtering), and Request body (data sent with a request, often when creating or updating).",
    analogy: "Imagine ordering a custom sandwich: The sandwich type in the menu (/sandwiches/turkey) is the Route Parameter. Specifying \"extra pickles\" (?pickles=extra) is the Query Parameter. The payment details you hand over to buy it is the Request Body.",
    codeSnippet: "import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';\n\n@Controller('courses')\nexport class CoursesController {\n  @Get(':id')\n  getCourse(@Param('id') id: string, @Query('view') view?: string) {\n    return { id, view: view ?? 'full' };\n  }\n\n  @Post()\n  createCourse(@Body() body: { title: string }) {\n    return { created: body.title };\n  }\n}",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. @Get(':id') with @Param('id')",
            "desc": "Captures the dynamic segment from the URL path (e.g. /courses/42)."
      },
      {
            "title": "2. @Query('view')",
            "desc": "Reads optional search query strings after the ? character (e.g. ?view=short)."
      },
      {
            "title": "3. @Post() with @Body()",
            "desc": "Parses the incoming JSON payload sent in the HTTP request body."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Input Channel Rule",
      "content": "Use @Param for identifying a specific resource by ID, @Query for filtering and pagination, and @Body for payloads when creating or updating data."
},
    cards: [
      {
            "number": "01",
            "tag": "PARAM",
            "title": "@Param for Resource Identifiers",
            "description": "Extracts exact resource IDs directly from URL route paths.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "QUERY",
            "title": "@Query for Options & Filters",
            "description": "Extracts search terms, sorting, and pagination flags from the query string.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "BODY",
            "title": "@Body for Structured Data",
            "description": "Extracts complex JSON payloads sent with POST, PUT, and PATCH requests.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Handling complex client inputs gracefully:",
    points: [
      {
            "title": "1. Type Annotations on Inputs",
            "content": "Typing parameters like @Param('id') id: string ensures TypeScript checks values throughout your handler."
      },
      {
            "title": "2. Fallback Values for Queries",
            "content": "Use default parameter assignments like @Query('page') page = 1 to handle missing query options."
      },
      {
            "title": "3. DTOs for Bodies",
            "content": "For large request bodies, define a dedicated DTO class to validate and type all fields."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Mixing Up @Param and @Query",
      "code": "// Bad: Trying to read /courses/42 using @Query\n@Get('details')\ngetCourse(@Query('id') id: string) {\n  // Client has to call /courses/details?id=42 instead of clean REST /courses/42\n  return this.service.find(id);\n}",
      "explanation": "Using query parameters for essential resource identity breaks REST conventions."
},
    good: {
      "title": "Clean Path Parameters for Identifiers",
      "code": "// Clean: RESTful path parameter\n@Get(':id')\ngetCourse(@Param('id') id: string) {\n  return this.service.find(id);\n}",
      "explanation": "Path parameters make resource URLs clean, readable, and bookmarkable."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test extracting path and query parameters in a controller:",
    starterCode: "import { Controller, Get, Param, Query } from '@nestjs/common';\n\n@Controller('products')\nexport class ProductsController {\n  @Get(':id')\n  getProduct(\n    @Param('id') id: string,\n    @Query('currency') currency = 'USD'\n  ) {\n    return { productId: id, currency, price: 99 };\n  }\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "In a request to /items/42?sort=asc, which decorator extracts \"42\" and which extracts \"asc\"?",
      "options": [
            "@Param extracts 42, and @Query extracts asc",
            "@Query extracts 42, and @Param extracts asc",
            "@Body extracts 42, and @Param extracts asc",
            "@Header extracts both"
      ],
      "correctIndex": 0,
      "explanation": "@Param reads path segments like :id (42), while @Query reads values following the question mark (?sort=asc)."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Three Input Types",
            "desc": "@Param for IDs in URLs, @Query for search flags, and @Body for JSON payloads."
      },
      {
            "title": "Declarative Extraction",
            "desc": "Decorators inject exactly the parameters your handler needs."
      },
      {
            "title": "Clean REST Endpoints",
            "desc": "Identify resources in the path and configure options in queries."
      }
],
    nextLessonPreview: {
      "title": "Providers and Services",
      "desc": "Learn how to encapsulate business logic in injectable services."
},
  },
};
