import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nj03ProjectStructureAndMainContent: StandardLessonContent = {
  slug: "nj03-project-structure-and-main",
  code: "NJ-03",
  title: "Project Structure and main.ts",
  subtitle: "A standard NestJS project starts in main.ts, creating the app instance and booting the server.",
  difficulty: "Moderate",
  scenario: {
    question: "Your controller and service are written, but the application never starts. Which file should you check first for startup setup?",
    answer: "Check `main.ts` and confirm it creates the app with the correct root module and calls `app.listen()`.",
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
    title: "Project Structure and main.ts",
    bigPicture: "A standard NestJS project starts in main.ts. That file creates the NestJS application and starts the server. AppModule is the root module that connects the application's main parts.",
    analogy: "main.ts is the main power switch for a building. When you flip it on, it powers the main circuit breaker (AppModule), which distributes electricity to all the individual rooms and appliances.",
    codeSnippet: "// src/main.ts\nimport { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  await app.listen(3000);\n}\n\nbootstrap();",
    breakdownTitle: "How the Example Works Step-by-Step",
    breakdownItems: [
      {
            "title": "1. NestFactory import",
            "desc": "NestFactory is a core class providing static methods to create app instances."
      },
      {
            "title": "2. AppModule import",
            "desc": "AppModule is the root module defining the dependency tree."
      },
      {
            "title": "3. NestFactory.create()",
            "desc": "Initializes the application with all registered modules and controllers."
      },
      {
            "title": "4. app.listen(3000)",
            "desc": "Starts the HTTP server and begins listening for incoming requests on port 3000."
      },
      {
            "title": "5. bootstrap() call",
            "desc": "Invokes the async startup function when the file runs in Node.js."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      "title": "Application Bootstrap Rule",
      "content": "Use main.ts exclusively for booting the application, setting global configurations (like port or global pipes), and starting the HTTP listener."
},
    cards: [
      {
            "number": "01",
            "tag": "ENTRY",
            "title": "Single Entry Point",
            "description": "main.ts is the guaranteed starting file executed by Node.js when launching NestJS.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "ROOT",
            "title": "Root AppModule",
            "description": "AppModule coordinates all feature modules across the entire application.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "GLOBAL",
            "title": "Global Listeners",
            "description": "Enables global middleware, global pipes, and port configuration in one place.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Practical configuration tasks inside main.ts:",
    points: [
      {
            "title": "1. Configurable Port",
            "content": "Read process.env.PORT || 3000 to allow deployment platforms to assign dynamic ports."
      },
      {
            "title": "2. Global Route Prefix",
            "content": "Add app.setGlobalPrefix('api') so all controller endpoints begin with /api automatically."
      },
      {
            "title": "3. Graceful Startup",
            "content": "Awaiting app.listen() ensures the server is ready before logging confirmation to the console."
      }
],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      "title": "Adding Business Logic Directly in main.ts",
      "code": "// Bad: Cluttering bootstrap with feature logic\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  // Bad: fetching users or running business rules here\n  const users = await calculateMetrics();\n  await app.listen(3000);\n}",
      "explanation": "main.ts should remain lean and only handle starting the HTTP server."
},
    good: {
      "title": "Keeping main.ts Clean and Focused",
      "code": "// Clean: Pure bootstrap setup\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  await app.listen(process.env.PORT || 3000);\n}\nbootstrap();",
      "explanation": "Keep main.ts focused on app creation, global plugins, and port listening."
},
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect a standard main.ts bootstrap flow:",
    starterCode: "import { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n  const port = process.env.PORT || 3000;\n  await app.listen(port);\n  console.log(`NestJS application listening on port ${port}`);\n}\n\nbootstrap();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      "question": "Which file creates the NestJS application instance and calls app.listen()?",
      "options": [
            "main.ts",
            "app.module.ts",
            "package.json",
            "index.html"
      ],
      "correctIndex": 0,
      "explanation": "main.ts is the root entry point responsible for creating the app with NestFactory and starting the server."
},
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Bootstrap File",
            "desc": "main.ts creates the app and starts the HTTP listener."
      },
      {
            "title": "AppModule Anchor",
            "desc": "AppModule is passed to NestFactory.create() as the root module."
      },
      {
            "title": "Global Configurations",
            "desc": "Global settings like ports and prefixes are configured here."
      }
],
    nextLessonPreview: {
      "title": "Modules",
      "desc": "Learn how modules group related controllers and services into clean feature boundaries."
},
  },
};
