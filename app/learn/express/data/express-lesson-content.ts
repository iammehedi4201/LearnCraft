/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * EXPRESS.JS LESSONS CONTENT REPOSITORY — SIMPLE, CLEAR & INTUITIVE EXPLANATIONS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Beginner-friendly explanations, real-world analogies, and practical examples
 * for all 28 Express.js lessons (EXP-01 through EXP-28).
 *
 * Strict Topic Boundary: Pure Express.js web framework only.
 * Teaches web layer architecture on Node.js, the app object, routing,
 * req/res handling, middleware pipeline, REST CRUD design, input validation,
 * Express 5 async error handling, Controller-Service separation, JWT auth guards,
 * Supertest integration tests, and production best practices.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface ExpressLessonSection {
  id: string;
  label: string;
  icon: string;
}

export interface ExpressLessonCard {
  number: string;
  tag: string;
  title: string;
  description: string;
  color?: "purple" | "emerald" | "amber" | "cyan" | "rose" | "indigo" | "blue";
}

export interface ExpressMentalModelPoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface ExpressCodeComparison {
  title: string;
  code: string;
  explanation: string;
}

export interface ExpressQuizData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExpressLessonTakeaway {
  title: string;
  desc: string;
}

export interface ExpressLessonContent {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  sections: ExpressLessonSection[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: Array<{ title: string; desc: string }>;
  };
  part2: {
    title: string;
    intro: string;
    cards: ExpressLessonCard[];
    rule: {
      title: string;
      content: string;
    };
  };
  part3: {
    title: string;
    intro: string;
    points: ExpressMentalModelPoint[];
  };
  part4: {
    title: string;
    bad: ExpressCodeComparison;
    good: ExpressCodeComparison;
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: ExpressQuizData;
  };
  part7: {
    title: string;
    takeaways: ExpressLessonTakeaway[];
    nextLessonPreview?: {
      title: string;
      desc: string;
    };
  };
}

export const EXPRESS_LESSONS_CONTENT: Record<string, ExpressLessonContent> = {
  // ─────────────────────────────────────────────────────────────
  // EXP-01: What Is Express.js?
  // ─────────────────────────────────────────────────────────────
  "exp01-what-is-express": {
    slug: "exp01-what-is-express",
    code: "EXP-01",
    title: "What Is Express.js & The Node.js Web Layer",
    subtitle: "Learn why Express exists, how it sits right on top of Node.js HTTP servers, and what problems it solves for developers.",
    sections: [
      { id: "part1", label: "Why Do We Need Express?", icon: "💡" },
      { id: "part2", label: "Node.js vs Express.js", icon: "⚙️" },
      { id: "part3", label: "Core Mental Model", icon: "🧩" },
      { id: "part4", label: "Native HTTP vs Express", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "The Problem with Raw Node.js HTTP",
      bigPicture: "Node.js has a built-in 'http' module that lets you create web servers. But building real APIs in raw Node requires writing hundreds of lines of boilerplate just to match URLs, parse query strings, handle request bodies, and manage errors. Express is a minimal, fast web framework built right on top of Node.js to solve these exact headaches.",
      breakdownTitle: "What Express adds on top of Node.js:",
      breakdownItems: [
        { title: "Declarative Routing", desc: "Write app.get('/users', handler) instead of giant nested if/switch statements checking req.url and req.method." },
        { title: "The Middleware Pipeline", desc: "A clean chain of reusable functions that process authentication, logging, validation, and JSON parsing before route handlers run." },
        { title: "Convenient Response Helpers", desc: "Send JSON, status codes, and headers with res.status(201).json({ id: 1 }) instead of manually stringifying and setting headers." },
        { title: "Centralized Error Handling", desc: "Forward errors to a single dedicated error middleware function instead of wrapping every single handler in repetitive try/catch blocks." },
      ],
    },
    part2: {
      title: "Comparing the Architectures",
      intro: "Understanding where Express sits in the backend stack prevents confusion between runtime capabilities and framework conveniences:",
      cards: [
        { number: "01", tag: "Runtime", title: "Node.js HTTP Server", description: "Provides the low-level TCP connection, incoming request stream, and raw response socket.", color: "purple" },
        { number: "02", tag: "Framework", title: "Express.js Layer", description: "Wraps req and res with rich helper methods, provides regex route matching, and manages the middleware stack.", color: "emerald" },
        { number: "03", tag: "Application", title: "Your Route Logic", description: "Pure business logic: handling requests, querying databases or services, and returning clean JSON payloads.", color: "cyan" },
      ],
      rule: {
        title: "The Golden Rule of Express",
        content: "Express DOES NOT replace Node.js. Express IS Node.js code that packages common server patterns into a minimal, expressive API.",
      },
    },
    part3: {
      title: "Mental Model: The Request Pipeline",
      intro: "Think of Express as a conveyor belt. When an HTTP request enters the factory, it moves along a pipeline of worker stations (middleware) before reaching the destination workshop (route handler):",
      points: [
        { title: "1. Incoming Request Arrival", content: "A client sends an HTTP GET /api/users request. Node's HTTP server receives the socket data and hands it to Express." },
        { title: "2. Passing Through Middleware", content: "Express passes the request through registered middleware: logging the timestamp, parsing the JSON body, and verifying security tokens." },
        { title: "3. Matching the Route Handler", content: "Express finds the route handler that matches the HTTP method (GET) and path (/api/users)." },
        { title: "4. Sending the Response", content: "The handler calls res.json(users), which formats the data, sets Content-Type: application/json, and finishes the HTTP response." },
      ],
    },
    part4: {
      title: "Code Comparison: Native Node.js vs Express",
      bad: {
        title: "Raw Node.js HTTP Server (Verbose & Manual)",
        code: `const http = require('node:http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, \`http://\${req.headers.host}\`);

  if (req.method === 'GET' && url.pathname === '/api/greet') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from Node!' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000);`,
        explanation: "Manual URL parsing, stringifying payloads, manual header configuration, and hard-to-maintain nested conditionals for routing.",
      },
      good: {
        title: "Express.js (Clean, Declarative & Readable)",
        code: `const express = require('express');
const app = express();

// Clean declarative routing
app.get('/api/greet', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Automatic 404 and content-type handling
app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
        explanation: "Clear route declaration with app.get(), automatic JSON serialization and Content-Type header with res.json().",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Experiment with a basic Express application. Define a GET route and send back a JSON greeting:",
      starterCode: `const express = require('express');
const app = express();

// 1. Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

// 2. Greeting route
app.get('/greet', (req, res) => {
  res.json({ message: 'Welcome to Express.js on LearnCraft!' });
});

console.log('Express app configured with 2 routes.');
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "What is the primary relationship between Node.js and Express.js?",
        options: [
          "Express replaces Node.js and runs its own custom JavaScript engine.",
          "Express is a lightweight web framework that runs on top of Node's built-in HTTP server capabilities.",
          "Express is a database query builder for PostgreSQL.",
          "Node.js cannot create HTTP servers without Express installed.",
        ],
        correctIndex: 1,
        explanation: "Express is a minimalist web framework written in JavaScript for Node.js. It simplifies routing, middleware, and request/response handling on top of Node's native HTTP server.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Express is a Web Layer", desc: "It provides clean routing, middleware, and response utilities on top of Node.js." },
        { title: "Declarative Routing", desc: "Use app.get(), app.post(), etc. instead of manual URL parsing and switch statements." },
        { title: "res.json() Simplifies APIs", desc: "Automatically formats JavaScript objects into JSON strings with correct HTTP headers." },
      ],
      nextLessonPreview: {
        title: "EXP-02: Creating the Application & The Express app Object",
        desc: "Learn how the app object works, how to configure server ports, and how to structure your entry point.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // EXP-02: Creating the Application & The app Object
  // ─────────────────────────────────────────────────────────────
  "exp02-app-object": {
    slug: "exp02-app-object",
    code: "EXP-02",
    title: "Creating the Application & The Express app Object",
    subtitle: "Understand how express() initializes your application instance, how settings work, and how app.listen starts the server.",
    sections: [
      { id: "part1", label: "The express() Factory", icon: "🏭" },
      { id: "part2", label: "The app Instance Anatomy", icon: "🔍" },
      { id: "part3", label: "Application Settings", icon: "⚙️" },
      { id: "part4", label: "Clean Server Bootstrap", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What Happens When You Call express()?",
      bigPicture: "Calling the top-level express() function creates an Express application instance. This object (traditionally named app) is both a request handler callback and a central registry for routes, middleware, and server settings.",
      breakdownTitle: "Key capabilities of the app object:",
      breakdownItems: [
        { title: "Routing Hub", desc: "Provides app.get(), app.post(), app.use(), and app.route() to map HTTP requests." },
        { title: "Middleware Registrar", desc: "Registers global middleware via app.use() that executes for every incoming request." },
        { title: "Server Listener", desc: "app.listen(port, callback) binds the app to a TCP port via Node's native http.createServer." },
        { title: "Config Storage", desc: "app.set(name, value) and app.get(name) allow setting internal flags like trust proxy or view engines." },
      ],
    },
    part2: {
      title: "Anatomy of an Express Application",
      intro: "Every Express application follows a standard lifecycle sequence:",
      cards: [
        { number: "01", tag: "Creation", title: "const app = express()", description: "Instantiates the Express app object and initializes the internal middleware stack router.", color: "purple" },
        { number: "02", tag: "Configuration", title: "app.use(express.json())", description: "Attaches global parsers and middleware before defining specific routes.", color: "emerald" },
        { number: "03", tag: "Mounting", title: "app.get('/api', handler)", description: "Registers endpoints for HTTP verbs and URL path patterns.", color: "cyan" },
        { number: "04", tag: "Listening", title: "app.listen(PORT, cb)", description: "Starts an underlying Node HTTP server listening on the specified network port.", color: "indigo" },
      ],
      rule: {
        title: "Order of Registration",
        content: "Express processes middleware and routes in the EXACT order they are registered with app.use() and app.METHOD(). Always register parsers and middleware BEFORE routes.",
      },
    },
    part3: {
      title: "Mental Model: app as the Central Coordinator",
      intro: "The app object is the central dispatcher for your entire backend service:",
      points: [
        { title: "It is a callable function", content: "Under the hood, app is a JavaScript function with the signature (req, res) => { ... } that passes incoming Node HTTP requests into Express." },
        { title: "app.listen() creates http.createServer", content: "Calling app.listen(3000) is a shorthand for http.createServer(app).listen(3000)." },
        { title: "Multiple apps can be mounted", content: "You can create sub-apps and mount them inside parent applications using app.use('/sub-path', subApp)." },
      ],
    },
    part4: {
      title: "Code Comparison: Server Creation Patterns",
      bad: {
        title: "Hardcoding Ports and Cluttered Startup",
        code: `const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('OK'));

// Bad: Hardcoded port and no error handling
app.listen(8080);`,
        explanation: "Hardcoded port prevents deployment configuration (process.env.PORT) and missing callback provides no feedback on startup status.",
      },
      good: {
        title: "Standard Configured Bootstrap Pattern",
        code: `const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

const server = app.listen(PORT, () => {
  console.log(\`Server listening on http://localhost:\${PORT}\`);
});`,
        explanation: "Uses environment variable with fallback, logs connection URL, and retains server instance for graceful shutdown.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Inspect the app object and test route registration:",
      starterCode: `const express = require('express');
const app = express();

// Setting application variables
app.set('title', 'LearnCraft Express Service');

// Defining endpoint
app.get('/info', (req, res) => {
  res.json({
    appTitle: app.get('title'),
    env: process.env.NODE_ENV || 'development'
  });
});

console.log('App title configured:', app.get('title'));
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "What is app.listen(3000) actually doing under the hood?",
        options: [
          "It compiles your Express routes into C++ native code.",
          "It calls Node's http.createServer(app).listen(3000) to bind to the network socket.",
          "It opens a connection to a local MongoDB database on port 3000.",
          "It forces the client browser to refresh automatically.",
        ],
        correctIndex: 1,
        explanation: "app.listen is a convenient wrapper around Node's native http.createServer(app).listen(). The Express app instance acts as the request listener callback for Node's HTTP server.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "app is the Application Hub", desc: "It holds routes, middleware, and application settings." },
        { title: "Dynamic Port Binding", desc: "Always prefer const PORT = process.env.PORT || 3000 for flexible environments." },
        { title: "Registration Order Matters", desc: "Express executes middleware sequentially from top to bottom." },
      ],
      nextLessonPreview: {
        title: "EXP-03: Understanding the Request-Response Cycle",
        desc: "Trace how req and res objects travel from client connection to response closure.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // EXP-03: The Request-Response Cycle
  // ─────────────────────────────────────────────────────────────
  "exp03-req-res-cycle": {
    slug: "exp03-req-res-cycle",
    code: "EXP-03",
    title: "Understanding the Request-Response Cycle",
    subtitle: "Follow the complete journey of an HTTP request from arrival, through routing, to socket termination.",
    sections: [
      { id: "part1", label: "The Complete Lifecycle", icon: "🔄" },
      { id: "part2", label: "req vs res Objects", icon: "📦" },
      { id: "part3", label: "Ending the Cycle", icon: "🛑" },
      { id: "part4", label: "Hanging Requests Pitfall", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is the Request-Response Cycle?",
      bigPicture: "Every interaction with an Express server starts with an incoming HTTP request (req) from a client and MUST end with an outgoing HTTP response (res) sent by the server. If your code never sends a response and never passes control to another handler, the client's request will hang indefinitely until it times out.",
      breakdownTitle: "The 4 stages of the cycle:",
      breakdownItems: [
        { title: "1. Request Parsing", desc: "Node parses the HTTP verb, URL path, headers, and begins streaming the body." },
        { title: "2. Middleware Flow", desc: "Express passes (req, res, next) through registered middleware functions in order." },
        { title: "3. Route Execution", desc: "The matching route handler processes the business logic and queries data." },
        { title: "4. Response Transmission", desc: "Calling res.json(), res.send(), or res.end() writes the response headers and payload to the TCP socket, completing the cycle." },
      ],
    },
    part2: {
      title: "Core Responsibilities of req and res",
      intro: "Express enhances Node's raw IncomingMessage and ServerResponse objects with powerful methods:",
      cards: [
        { number: "req", tag: "Input Stream", title: "Incoming Request (req)", description: "Contains headers, path params (req.params), query strings (req.query), body (req.body), and IP address.", color: "purple" },
        { number: "res", tag: "Output Stream", title: "Outgoing Response (res)", description: "Provides methods to set status codes (res.status), send JSON (res.json), set headers (res.set), and redirect (res.redirect).", color: "emerald" },
      ],
      rule: {
        title: "The Single Response Rule",
        content: "You can only send ONE HTTP response per request. Trying to call res.json() or res.send() twice for the same request triggers the famous 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client'.",
      },
    },
    part3: {
      title: "Mental Model: The Open & Closed Transaction",
      intro: "Think of an HTTP request like a customer ordering at a drive-thru window:",
      points: [
        { title: "Window Opens (Request Arrives)", content: "The customer places an order. Express opens an active transaction." },
        { title: "Kitchen Prepares (Middleware & Handler)", content: "Workers log the ticket, check payment, and prepare the item." },
        { title: "Food Handed Over (Response Sent)", content: "res.json() hands over the payload and closes the transaction." },
        { title: "Window Closes (Socket Teardown)", content: "The cycle is complete. Nothing more can be handed through this window." },
      ],
    },
    part4: {
      title: "Code Comparison: Hanging vs Properly Terminated Handlers",
      bad: {
        title: "Hanging Request (Forgot to send response or call next)",
        code: `app.get('/users', (req, res) => {
  const users = [{ id: 1, name: 'Alice' }];
  // BUG: Forgot res.json(users) or return
  console.log('Found users:', users);
  // Client will spin forever and time out!
});`,
        explanation: "No response method (res.send, res.json, res.end) is called. The client request hangs indefinitely.",
      },
      good: {
        title: "Properly Terminated Response",
        code: `app.get('/users', (req, res) => {
  const users = [{ id: 1, name: 'Alice' }];
  res.status(200).json({ success: true, data: users });
});`,
        explanation: "Explicitly sets status 200 and sends the JSON payload, cleanly completing the request-response cycle.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Observe the request-response cycle in action with request duration tracking:",
      starterCode: `const express = require('express');
const app = express();

// Simple timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`[\${req.method}] \${req.url} finished in \${duration}ms with status \${res.statusCode}\`);
  });
  next();
});

app.get('/ping', (req, res) => {
  res.status(200).json({ pong: true, time: new Date() });
});
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "What happens if a route handler executes its code but never calls a response method (res.json, res.send) or next()?",
        options: [
          "Express automatically sends a 200 OK with empty body.",
          "The client browser or API client hangs until a network timeout occurs.",
          "Node.js crashes immediately with a fatal memory leak error.",
          "Express reroutes the request to the 404 handler automatically.",
        ],
        correctIndex: 1,
        explanation: "If an Express handler does not terminate the response or invoke next(), the HTTP connection remains open, causing the client to hang until it times out.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Every Request Must Terminate", desc: "Always send a response with res.json(), res.send(), or pass control with next()." },
        { title: "Headers Sent Once", desc: "Never attempt to call response methods multiple times for a single request." },
        { title: "Lifecycle Closure", desc: "Calling res.json() writes headers and body to the socket and completes the cycle." },
      ],
      nextLessonPreview: {
        title: "EXP-04: HTTP Methods & Basic Route Definition",
        desc: "Learn how to define GET, POST, PUT, PATCH, and DELETE endpoints cleanly in Express.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // EXP-04: HTTP Methods & Basic Route Definition
  // ─────────────────────────────────────────────────────────────
  "exp04-http-methods-routes": {
    slug: "exp04-http-methods-routes",
    code: "EXP-04",
    title: "HTTP Methods & Basic Route Definition",
    subtitle: "Map HTTP verbs (GET, POST, PUT, PATCH, DELETE) to Express route handlers and understand route path matching.",
    sections: [
      { id: "part1", label: "HTTP Verb Mapping", icon: "🌐" },
      { id: "part2", label: "CRUD Operations", icon: "📝" },
      { id: "part3", label: "Route Matching Rules", icon: "🎯" },
      { id: "part4", label: "app.all() & app.route()", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Mapping HTTP Verbs to Express Methods",
      bigPicture: "Routing determines how an application responds to a client request to a particular endpoint, which is a URI (path) and a specific HTTP request method (GET, POST, PUT, DELETE, etc.). Express provides methods named directly after HTTP verbs on the app instance.",
      breakdownTitle: "Primary HTTP Routing Methods in Express:",
      breakdownItems: [
        { title: "app.get(path, handler)", desc: "Retrieves data. Safe and idempotent. Must not modify server state." },
        { title: "app.post(path, handler)", desc: "Submits new data to create a resource on the server." },
        { title: "app.put(path, handler)", desc: "Replaces an existing resource entirely with the provided payload." },
        { title: "app.patch(path, handler)", desc: "Partially updates specific fields on an existing resource." },
        { title: "app.delete(path, handler)", desc: "Removes an existing resource by identifier." },
      ],
    },
    part2: {
      title: "HTTP Verbs and REST Semantics",
      intro: "Matching correct HTTP methods to their architectural intent creates predictable APIs:",
      cards: [
        { number: "GET", tag: "Read", title: "/api/tasks", description: "Returns a list of task records. Status 200 OK.", color: "purple" },
        { number: "POST", tag: "Create", title: "/api/tasks", description: "Creates a new task from req.body. Status 201 Created.", color: "emerald" },
        { number: "PUT", tag: "Replace", title: "/api/tasks/:id", description: "Replaces the entire task with new fields. Status 200 OK.", color: "amber" },
        { number: "DELETE", tag: "Remove", title: "/api/tasks/:id", description: "Deletes task from storage. Status 200 OK or 204 No Content.", color: "rose" },
      ],
      rule: {
        title: "Idempotency Rule",
        content: "GET, PUT, and DELETE should be idempotent: calling them multiple times with the same inputs produces the same server state as calling them once.",
      },
    },
    part3: {
      title: "Mental Model: The Method + Path Dispatcher",
      intro: "Express matches incoming requests using BOTH the HTTP verb and the URL path:",
      points: [
        { title: "Exact Method Check", content: "A POST request to /users will NOT trigger app.get('/users'). It only matches app.post('/users')." },
        { title: "Chainable Route Definition", content: "app.route('/tasks').get(getTasks).post(createTask) allows grouping handlers by path." },
        { title: "app.all() for universal handlers", content: "app.all('/secret', guard) runs for any HTTP method reaching /secret." },
      ],
    },
    part4: {
      title: "Code Comparison: Redundant vs Grouped Routes",
      bad: {
        title: "Scattered Repeated Paths",
        code: `app.get('/api/books', (req, res) => { ... });
app.post('/api/books', (req, res) => { ... });
app.delete('/api/books', (req, res) => { ... });`,
        explanation: "Repeating path strings across separate lines increases typo risks during refactoring.",
      },
      good: {
        title: "Grouped Route with app.route()",
        code: `app.route('/api/books')
  .get((req, res) => {
    res.json({ books: [] });
  })
  .post((req, res) => {
    res.status(201).json({ created: true });
  })
  .delete((req, res) => {
    res.json({ deleted: true });
  });`,
        explanation: "app.route() groups handlers by path, improving clarity and preventing path duplication.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Test different HTTP methods on the /tasks endpoint:",
      starterCode: `const express = require('express');
const app = express();
app.use(express.json());

const tasks = [{ id: 1, title: 'Learn Express Routing' }];

app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

app.post('/tasks', (req, res) => {
  const newTask = { id: tasks.length + 1, title: req.body?.title || 'New Task' };
  tasks.push(newTask);
  res.status(201).json({ task: newTask });
});
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "Which HTTP status code should be returned when a POST request successfully creates a new resource?",
        options: [
          "200 OK",
          "201 Created",
          "204 No Content",
          "302 Found",
        ],
        correctIndex: 1,
        explanation: "201 Created is the standard HTTP status code for successful resource creation.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Match HTTP Verbs to Intent", desc: "Use GET for reading, POST for creating, PUT/PATCH for updating, DELETE for removing." },
        { title: "app.route() Groups Handlers", desc: "Chain .get(), .post(), etc. on single path declarations to keep code DRY." },
        { title: "Proper Status Codes", desc: "Return 200 for OK, 201 for Created, and 204 for No Content." },
      ],
      nextLessonPreview: {
        title: "EXP-05: Route Parameters (req.params) vs Query Strings (req.query)",
        desc: "Learn how to extract dynamic identifiers and optional search filters from URLs.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // EXP-05: Route Params vs Query Params
  // ─────────────────────────────────────────────────────────────
  "exp05-route-query-params": {
    slug: "exp05-route-query-params",
    code: "EXP-05",
    title: "Route Parameters (req.params) vs Query Strings (req.query)",
    subtitle: "Distinguish resource identifiers (/users/:id) from optional filters (/users?role=admin) and access them safely.",
    sections: [
      { id: "part1", label: "Params vs Query Strings", icon: "🔍" },
      { id: "part2", label: "req.params Mechanics", icon: "🆔" },
      { id: "part3", label: "req.query Mechanics", icon: "📊" },
      { id: "part4", label: "Common Type Pitfalls", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Route Params vs Query Params",
      bigPicture: "Clients send data in the URL in two distinct ways: Route Parameters are named segments used to identify specific resources (e.g. /users/:userId). Query Parameters appear after the '?' symbol and are used to filter, sort, or paginate collections (e.g. /users?limit=10&sort=desc).",
      breakdownTitle: "Clear distinction between the two:",
      breakdownItems: [
        { title: "Route Params (req.params)", desc: "Required path segments identifying an entity: /products/:productId/reviews/:reviewId." },
        { title: "Query Params (req.query)", desc: "Optional key-value pairs modifying the view of a collection: ?search=book&page=2." },
        { title: "Always Strings", desc: "Values in both req.params and req.query are ALWAYS strings. You must cast numbers (Number(req.params.id))." },
        { title: "Automatic Parsing", desc: "Express parses route params into req.params and query strings into req.query automatically." },
      ],
    },
    part2: {
      title: "Working with req.params",
      intro: "Route parameters are defined with a colon prefix (':') in the route string:",
      cards: [
        { number: ":id", tag: "Single Param", title: "app.get('/users/:id')", description: "GET /users/42 yields req.params = { id: '42' }.", color: "purple" },
        { number: ":dept/:id", tag: "Nested Params", title: "app.get('/orgs/:orgId/teams/:teamId')", description: "GET /orgs/acme/teams/dev yields req.params = { orgId: 'acme', teamId: 'dev' }.", color: "emerald" },
      ],
      rule: {
        title: "String Type Caution",
        content: "req.params.id is the string '42', NOT the number 42. In strict comparisons (===), '42' !== 42. Always use parseInt(req.params.id, 10) or Number(req.params.id).",
      },
    },
    part3: {
      title: "Mental Model: Identifying vs Modifying",
      intro: "Use this rule of thumb when designing URLs:",
      points: [
        { title: "Is it essential to identify WHICH item?", content: "Use Route Params: GET /articles/:slug (e.g. /articles/learn-express)." },
        { title: "Is it an OPTIONAL modifier or filter?", content: "Use Query Params: GET /articles?tag=node&published=true." },
        { title: "Query strings can be omitted", content: "Your route handler should handle missing query parameters gracefully with default values." },
      ],
    },
    part4: {
      title: "Code Comparison: Type Parsing & Defaults",
      bad: {
        title: "Assuming Numbers and Missing Defaults",
        code: `app.get('/tasks/:id', (req, res) => {
  // BUG: Strict equality fails because id is a string
  const task = tasks.find(t => t.id === req.params.id); 
  res.json(task);
});`,
        explanation: "t.id (number) === req.params.id (string) is always false! Fails to find existing record.",
      },
      good: {
        title: "Safe Parsing and 404 Guard",
        code: `app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (Number.isNaN(taskId)) {
    return res.status(400).json({ error: 'Task ID must be a valid integer' });
  }

  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json({ data: task });
});`,
        explanation: "Safely parses integer, validates input, guards against not found, and returns typed JSON.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Experiment with both route parameters and query strings:",
      starterCode: `const express = require('express');
const app = express();

const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'member' },
  { id: 3, name: 'Charlie', role: 'member' }
];

// Query filtering
app.get('/users', (req, res) => {
  const { role } = req.query;
  const filtered = role ? users.filter(u => u.role === role) : users;
  res.json({ count: filtered.length, data: filtered });
});

// Route parameter lookup
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "When a request is made to GET /products?category=electronics&limit=10, what will req.query contain?",
        options: [
          "{ category: 'electronics', limit: 10 } (number)",
          "{ category: 'electronics', limit: '10' } (strings)",
          "An array: ['electronics', '10']",
          "undefined unless a query parser middleware is manually installed.",
        ],
        correctIndex: 1,
        explanation: "Express automatically parses query strings into an object where all values are initially strings ({ category: 'electronics', limit: '10' }).",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Route Params Identify", desc: "Use req.params for required resource identifiers in the URL path." },
        { title: "Query Params Filter", desc: "Use req.query for optional filters, sorting, and pagination options." },
        { title: "Always Parse Types", desc: "URL params are strings. Always convert numbers using Number() or parseInt()." },
      ],
      nextLessonPreview: {
        title: "EXP-06: Modular Routing with express.Router()",
        desc: "Organize large route collections into modular, isolated router files.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // EXP-06: Modular Routing with express.Router()
  // ─────────────────────────────────────────────────────────────
  "exp06-express-router": {
    slug: "exp06-express-router",
    code: "EXP-06",
    title: "Modular Routing with express.Router()",
    subtitle: "Split massive route files into clean, independent mini-applications and mount them on URL prefixes.",
    sections: [
      { id: "part1", label: "Why express.Router()?", icon: "🔀" },
      { id: "part2", label: "Creating & Exporting Routers", icon: "📁" },
      { id: "part3", label: "Mounting on Path Prefixes", icon: "🔌" },
      { id: "part4", label: "Monolithic vs Modular", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why Do We Need express.Router()?",
      bigPicture: "Putting all routes for users, products, orders, and authentication into a single app.js file creates an unmaintainable monolith. express.Router() creates isolated mini-applications that define their own routes and middleware, which can then be mounted cleanly inside the main app.",
      breakdownTitle: "Benefits of express.Router():",
      breakdownItems: [
        { title: "Separation of Concerns", desc: "Group related endpoints into dedicated files (e.g. routes/users.js, routes/products.js)." },
        { title: "Prefix Encapsulation", desc: "Define routes relative to the router root ('/') and mount them globally at '/api/v1/users'." },
        { title: "Scoped Middleware", desc: "Apply middleware (like auth checks) strictly to a specific router without affecting other endpoints." },
        { title: "Reusability", desc: "Routers can be exported, imported, and tested as self-contained modules." },
      ],
    },
    part2: {
      title: "Creating and Exporting a Router",
      intro: "A router module is created with express.Router() and exported as a standard module:",
      cards: [
        { number: "1", tag: "Router Module", title: "routes/tasks.js", description: "const router = express.Router(); router.get('/', ...); module.exports = router;", color: "purple" },
        { number: "2", tag: "Main App Mount", title: "app.js", description: "const taskRoutes = require('./routes/tasks'); app.use('/api/tasks', taskRoutes);", color: "emerald" },
      ],
      rule: {
        title: "Relative Route Paths",
        content: "Inside a router file, define paths relative to its mounting point. If mounted at '/api/tasks', writing router.get('/') handles 'GET /api/tasks', and router.get('/:id') handles 'GET /api/tasks/:id'.",
      },
    },
    part3: {
      title: "Mental Model: Routers as Department Offices",
      intro: "Think of your main Express app as a building lobby, and Routers as dedicated department offices:",
      points: [
        { title: "Main App (The Directory)", content: "Routes requests matching /users/* to the Users Department, and /orders/* to the Orders Department." },
        { title: "Router (The Department)", content: "Handles actions inside its own domain (create, list, delete) without worrying about other departments." },
        { title: "URL Prefix Composition", content: "Mount prefix + Router path = Complete endpoint URL." },
      ],
    },
    part4: {
      title: "Code Comparison: Monolithic App vs Modular Routers",
      bad: {
        title: "1,000-Line Monolithic app.js",
        code: `const express = require('express');
const app = express();

// User routes
app.get('/api/users', ...);
app.post('/api/users', ...);

// Product routes
app.get('/api/products', ...);
app.post('/api/products', ...);

// Order routes
app.get('/api/orders', ...);`,
        explanation: "All routes, helpers, and handlers live in one giant file, making maintenance and team collaboration painful.",
      },
      good: {
        title: "Clean Modular Router Separation",
        code: `// routes/users.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ users: [] }));
router.post('/', (req, res) => res.status(201).json({ created: true }));

module.exports = router;

// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/users.routes');

app.use('/api/users', userRoutes);`,
        explanation: "Each resource domain is self-contained in its own router file, mounted cleanly with an explicit path prefix.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Create a sub-router and mount it with a custom prefix:",
      starterCode: `const express = require('express');
const app = express();

// 1. Create a mini-router for products
const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  res.json({ products: [{ id: 101, name: 'Keyboard' }] });
});

productRouter.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Keyboard' });
});

// 2. Mount productRouter onto '/api/v1/products'
app.use('/api/v1/products', productRouter);

console.log('Product router mounted on /api/v1/products');
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "If a router is mounted using app.use('/api/v1/posts', postRouter), what full URL path will router.get('/:id') match?",
        options: [
          "/api/v1/:id",
          "/api/v1/posts/:id",
          "/:id",
          "/posts/:id",
        ],
        correctIndex: 1,
        explanation: "Express concatenates the mount path prefix ('/api/v1/posts') with the router's internal path ('/:id') to form '/api/v1/posts/:id'.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "express.Router() Creates Modules", desc: "Isolates route collections into maintainable mini-apps." },
        { title: "app.use(prefix, router)", desc: "Mounts the router on a clean URL base path." },
        { title: "Paths are Relative", desc: "Write router.get('/') and router.get('/:id') inside router modules." },
      ],
      nextLessonPreview: {
        title: "EXP-07: Inspecting Headers, HTTP Status Codes & Sending JSON",
        desc: "Master response payload formatting, status code semantics, and custom HTTP headers.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // EXP-07: Inspecting Headers, Status Codes & Sending JSON
  // ─────────────────────────────────────────────────────────────
  "exp07-headers-status-json": {
    slug: "exp07-headers-status-json",
    code: "EXP-07",
    title: "Inspecting Headers, HTTP Status Codes & Sending JSON",
    subtitle: "Read request headers with req.get(), configure response status codes, and serialize JSON with res.json().",
    sections: [
      { id: "part1", label: "Reading Request Headers", icon: "📨" },
      { id: "part2", label: "HTTP Status Code Semantics", icon: "🔢" },
      { id: "part3", label: "Setting Response Headers", icon: "📤" },
      { id: "part4", label: "res.send vs res.json", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Reading Request Headers with Express",
      bigPicture: "HTTP headers carry metadata about the request, such as authentication tokens (Authorization), client content preferences (Accept), and payload format (Content-Type). Express makes reading headers case-insensitive with req.get(headerName) or req.headers.",
      breakdownTitle: "Key header inspection methods:",
      breakdownItems: [
        { title: "req.get('authorization')", desc: "Reads the Authorization header in a case-insensitive manner." },
        { title: "req.is('json')", desc: "Checks if the incoming request's Content-Type matches 'json' or 'application/json'." },
        { title: "req.accepts('json')", desc: "Checks if the client Accept header permits a JSON response." },
      ],
    },
    part2: {
      title: "Essential HTTP Status Codes for APIs",
      intro: "Always return accurate HTTP status codes alongside your response data:",
      cards: [
        { number: "200", tag: "Success", title: "200 OK / 201 Created", description: "200 for successful reads/updates. 201 when a new entity is created.", color: "emerald" },
        { number: "400", tag: "Client Error", title: "400 Bad Request", description: "Invalid payload, missing fields, or failed input validation.", color: "amber" },
        { number: "401/403", tag: "Security", title: "401 Unauthorized / 403 Forbidden", description: "401: Missing or invalid token. 403: Authenticated, but lacks role permission.", color: "rose" },
        { number: "404", tag: "Not Found", title: "404 Not Found", description: "Requested resource ID or endpoint path does not exist.", color: "purple" },
        { number: "500", tag: "Server Error", title: "500 Internal Server Error", description: "Unexpected unhandled server exception or database crash.", color: "indigo" },
      ],
      rule: {
        title: "Chainable Status Method",
        content: "res.status(code) returns the res object, allowing you to chain the response body: res.status(201).json({ id: 1 }).",
      },
    },
    part3: {
      title: "Mental Model: Headers as the Envelope Metadata",
      intro: "Think of an HTTP request like postal mail:",
      points: [
        { title: "Envelope Headers", content: "Return address, postmark date, priority stamp, and content type." },
        { title: "Letter Content (Body)", content: "The actual JSON payload inside the envelope." },
        { title: "res.set() / res.header()", content: "Sets custom headers: res.set('X-RateLimit-Remaining', '99')." },
      ],
    },
    part4: {
      title: "Code Comparison: res.send vs res.json",
      bad: {
        title: "Manual Stringify and Header Setup",
        code: `app.get('/user', (req, res) => {
  const user = { name: 'Sam' };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(user));
});`,
        explanation: "Verbose and unnecessary. res.json() handles serialization, formatting, and content-type automatically.",
      },
      good: {
        title: "Using res.status().json()",
        code: `app.get('/user', (req, res) => {
  const user = { name: 'Sam' };
  res.status(200).json({ success: true, data: user });
});`,
        explanation: "Clean, idiomatic Express. Automatically sets Content-Type: application/json; charset=utf-8.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Inspect headers and send a response with custom headers and status codes:",
      starterCode: `const express = require('express');
const app = express();

app.get('/api/secure-data', (req, res) => {
  const authHeader = req.get('authorization');
  
  if (!authHeader) {
    return res.status(401).json({
      error: 'Missing Authorization header'
    });
  }

  res.set('X-Api-Version', '1.0.0');
  res.status(200).json({
    secret: 'learncraft-vault-payload',
    authenticated: true
  });
});
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "What is the primary difference between res.send(data) and res.json(data) when passing an object?",
        options: [
          "res.send will crash if passed a JavaScript object.",
          "res.json explicitly formats the object using JSON.stringify and sets Content-Type: application/json.",
          "res.send only works with HTML templates.",
          "res.json saves the data to a local JSON file on the server disk.",
        ],
        correctIndex: 1,
        explanation: "res.json() ensures the payload is serialized as JSON and guarantees the Content-Type response header is application/json.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "req.get() for Headers", desc: "Read request headers safely without worrying about letter casing." },
        { title: "Explicit Status Codes", desc: "Always chain res.status(201).json(...) to communicate outcome accurately." },
        { title: "res.set() for Custom Headers", desc: "Set outgoing headers before sending response payload." },
      ],
      nextLessonPreview: {
        title: "EXP-08: Body Parsing with express.json() & express.urlencoded()",
        desc: "Learn how Express buffers and parses incoming POST/PUT JSON request streams into req.body.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // EXP-08: Body Parsing with express.json()
  // ─────────────────────────────────────────────────────────────
  "exp08-body-parsing": {
    slug: "exp08-body-parsing",
    code: "EXP-08",
    title: "Body Parsing with express.json() & express.urlencoded()",
    subtitle: "Understand how incoming request streams are buffered, parsed, and attached to req.body.",
    sections: [
      { id: "part1", label: "Why is req.body Undefined?", icon: "❓" },
      { id: "part2", label: "The express.json() Middleware", icon: "📦" },
      { id: "part3", label: "URL-Encoded Form Data", icon: "📋" },
      { id: "part4", label: "Payload Size Limits", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Why is req.body Undefined by Default?",
      bigPicture: "In Node.js, an incoming HTTP request body arrives as an asynchronous stream of raw binary chunks (Buffers). By default, Express does NOT buffer or parse the body to keep the framework lightweight and avoid allocating memory for requests that don't need it. To read POST/PUT JSON payloads, you must enable express.json() middleware.",
      breakdownTitle: "How body parsing works under the hood:",
      breakdownItems: [
        { title: "1. Checks Content-Type", desc: "Inspects if Content-Type header is application/json." },
        { title: "2. Collects Stream Chunks", desc: "Listens to req.on('data') and buffers the binary chunks in memory." },
        { title: "3. JSON.parse Parsing", desc: "Executes JSON.parse() on the completed buffer string." },
        { title: "4. Attaches to req.body", desc: "Populates req.body with the parsed JavaScript object and calls next()." },
      ],
    },
    part2: {
      title: "Enabling Built-In Parsers",
      intro: "Express includes built-in body parsing middleware derived from body-parser:",
      cards: [
        { number: "json()", tag: "JSON Payloads", title: "app.use(express.json())", description: "Parses incoming requests with Content-Type: application/json.", color: "purple" },
        { number: "urlencoded()", tag: "HTML Form Posts", title: "app.use(express.urlencoded({ extended: true }))", description: "Parses standard HTML form submissions (application/x-www-form-urlencoded).", color: "emerald" },
      ],
      rule: {
        title: "Register Before Routes",
        content: "app.use(express.json()) MUST be registered BEFORE your route handlers. If defined after a route, req.body will be undefined inside that route.",
      },
    },
    part3: {
      title: "Mental Model: The Mail Opener Middleware",
      intro: "Think of express.json() as a dedicated mailroom assistant:",
      points: [
        { title: "Package arrives sealed", content: "Raw HTTP body arrives as a closed binary stream." },
        { title: "Assistant opens package", content: "express.json() reads the payload and turns JSON text into a live JavaScript object." },
        { title: "Places on your desk", content: "It attaches the object to req.body and calls next() so your handler can read it immediately." },
      ],
    },
    part4: {
      title: "Code Comparison: Missing vs Configured Body Parser",
      bad: {
        title: "Missing express.json() (req.body is undefined)",
        code: `const express = require('express');
const app = express();

// BUG: express.json() is missing!
app.post('/api/users', (req, res) => {
  // Crashes or reads undefined: TypeError: Cannot read properties of undefined
  console.log('Username:', req.body.username); 
  res.json({ ok: true });
});`,
        explanation: "Without express.json(), req.body is undefined on incoming POST/PUT requests.",
      },
      good: {
        title: "Correctly Configured with Size Limit",
        code: `const express = require('express');
const app = express();

// Enable JSON body parsing with reasonable size limit
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.post('/api/users', (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'username and email required' });
  }
  res.status(201).json({ created: { username, email } });
});`,
        explanation: "Parses JSON safely and guards against oversized payloads with the limit option.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Experiment with receiving and validating POST request bodies:",
      starterCode: `const express = require('express');
const app = express();

// Enable JSON parsing
app.use(express.json());

const database = [];

app.post('/items', (req, res) => {
  const { name, price } = req.body;
  
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Valid name and numeric price are required' });
  }

  const item = { id: database.length + 1, name, price };
  database.push(item);
  res.status(201).json({ success: true, item });
});
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "Why is req.body undefined on a POST request if express.json() is omitted?",
        options: [
          "Express requires a database connection to parse bodies.",
          "Node streams incoming data asynchronously; Express does not buffer or parse it into an object without body-parsing middleware.",
          "POST requests are not supported in Express without third-party plugins.",
          "Browsers do not send bodies in JSON format.",
        ],
        correctIndex: 1,
        explanation: "HTTP request bodies are asynchronous data streams. Express leaves req.body undefined unless a body parsing middleware like express.json() buffers and parses the stream.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "app.use(express.json()) is Essential", desc: "Required to parse JSON payloads into req.body on POST/PUT requests." },
        { title: "Register First", desc: "Always register body parsers at the top of your middleware stack." },
        { title: "Configure Size Limits", desc: "Use { limit: '1mb' } to protect against denial-of-service memory exhaustion." },
      ],
      nextLessonPreview: {
        title: "EXP-09: Handling Response Helpers, Content Negotiation & Redirects",
        desc: "Learn about res.sendFile(), res.download(), res.redirect(), and content negotiation.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // EXP-09: Response Helpers & Redirects
  // ─────────────────────────────────────────────────────────────
  "exp09-response-helpers": {
    slug: "exp09-response-helpers",
    code: "EXP-09",
    title: "Handling Response Helpers, Content Negotiation & Redirects",
    subtitle: "Use res.sendFile(), res.download(), res.redirect(), and avoid common response headers errors.",
    sections: [
      { id: "part1", label: "Response Methods Overview", icon: "🧰" },
      { id: "part2", label: "Redirects & File Downloads", icon: "📥" },
      { id: "part3", label: "The Headers Sent Error", icon: "⚠️" },
      { id: "part4", label: "Common Pitfalls", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "Express Response Helper Methods",
      bigPicture: "Express provides specialized helper methods on the res object for sending files, triggering browser downloads, redirecting users, and rendering templates. Knowing which helper to use makes your code concise and idiomatic.",
      breakdownTitle: "Common response helpers:",
      breakdownItems: [
        { title: "res.json(obj)", desc: "Serializes object as JSON and sets Content-Type: application/json." },
        { title: "res.send(body)", desc: "Sends Strings, Buffers, or Objects with automatic content-type detection." },
        { title: "res.redirect(url)", desc: "Sends a 302 Found redirect to transfer the client to another URL." },
        { title: "res.sendFile(path)", desc: "Streams a local file to the client with automatic MIME type headers." },
        { title: "res.download(path)", desc: "Sets Content-Disposition header to prompt client file download." },
      ],
    },
    part2: {
      title: "Understanding Redirects and Downloads",
      intro: "Controlling client navigation and file transfer with dedicated helpers:",
      cards: [
        { number: "302", tag: "Redirect", title: "res.redirect('/new-url')", description: "Instructs the browser or client to immediately request a different URL path.", color: "purple" },
        { number: "File", tag: "Download", title: "res.download('/files/report.pdf')", description: "Forces browser 'Save As' download dialog with correct filename.", color: "emerald" },
      ],
      rule: {
        title: "Always Return After Sending",
        content: "Calling res.json() does NOT stop JavaScript execution in your handler. If you have code after res.json(), use 'return res.json(...)' to prevent unintended code execution.",
      },
    },
    part3: {
      title: "Mental Model: The 'Cannot set headers' Mystery",
      intro: "Why does Error [ERR_HTTP_HEADERS_SENT] happen so often?",
      points: [
        { title: "HTTP Protocol Rule", content: "An HTTP transaction consists of one header block followed by the payload." },
        { title: "First call sends headers", content: "The first res.json() writes headers to the TCP socket." },
        { title: "Second call crashes", content: "A second res.status(400).json() tries to write headers to an already-closed header block, triggering a crash." },
      ],
    },
    part4: {
      title: "Code Comparison: Missing Return Statement",
      bad: {
        title: "Missing return after res.status (Causes Headers Crash)",
        code: `app.get('/user/:id', (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    // BUG: Missing 'return' - execution continues below!
  }

  // This line runs even when user was not found!
  res.json({ user }); // CRASH: Cannot set headers after they are sent
});`,
        explanation: "Execution continues past the if statement, attempting to send a second response to the same client.",
      },
      good: {
        title: "Clean Early Returns",
        code: `app.get('/user/:id', (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({ user });
});`,
        explanation: "Using return res.status(...) guarantees immediate handler exit upon sending a response.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Experiment with redirects and early return patterns:",
      starterCode: `const express = require('express');
const app = express();

app.get('/legacy-endpoint', (req, res) => {
  // 301 Permanent Redirect to modern API
  return res.redirect(301, '/api/v2/data');
});

app.get('/api/v2/data', (req, res) => {
  return res.json({ version: 'v2', active: true });
});
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "What causes the 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client' error?",
        options: [
          "The client disconnected before the server could respond.",
          "The server attempted to send an HTTP status code or header after already sending a response to the client.",
          "Express failed to parse an incoming JSON body.",
          "The port is already in use by another application.",
        ],
        correctIndex: 1,
        explanation: "This error occurs when application code calls a response method (like res.json or res.send) multiple times for the same HTTP request.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Use 'return res.json()'", desc: "Always prefix response calls with 'return' inside conditional branches." },
        { title: "res.redirect() for Relocation", desc: "Easily transfer clients to new routes with HTTP 301/302." },
        { title: "res.download() for Files", desc: "Prompts the browser to download files with proper Content-Disposition." },
      ],
      nextLessonPreview: {
        title: "EXP-10: What Is Middleware? The (req, res, next) Mental Model",
        desc: "Deep-dive into the cornerstone of Express: the middleware pipeline and next() function.",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // EXP-10: What Is Middleware? (req, res, next)
  // ─────────────────────────────────────────────────────────────
  "exp10-middleware-mental-model": {
    slug: "exp10-middleware-mental-model",
    code: "EXP-10",
    title: "What Is Middleware? The (req, res, next) Mental Model",
    subtitle: "Build a rock-solid mental model of middleware functions, how next() hands off control, and why order matters.",
    sections: [
      { id: "part1", label: "What is Middleware?", icon: "💡" },
      { id: "part2", label: "The (req, res, next) Signature", icon: "✍️" },
      { id: "part3", label: "Calling next() vs Stopping", icon: "🛑" },
      { id: "part4", label: "Middleware Pipeline Trace", icon: "⚖️" },
      { id: "part5", label: "Interactive Playground", icon: "⚡" },
      { id: "part6", label: "Concept Check", icon: "🎯" },
      { id: "part7", label: "Summary & Next Up", icon: "🚀" },
    ],
    part1: {
      title: "What is Middleware in Plain English?",
      bigPicture: "Middleware is simply a JavaScript function that runs during the lifecycle of an incoming HTTP request before it reaches your final route handler. Middleware can inspect the request, modify req or res, end the request early (e.g. Reject unauthorized user), or call next() to pass control to the next function in line.",
      breakdownTitle: "The 4 powers of middleware:",
      breakdownItems: [
        { title: "1. Execute Any Code", desc: "Perform database lookups, write audit logs, compute elapsed execution time." },
        { title: "2. Modify req and res", desc: "Attach custom data (like req.user or req.requestId) for downstream handlers to use." },
        { title: "3. End the Request Cycle", desc: "Send an early response: res.status(401).json({ error: 'Unauthorized' })." },
        { title: "4. Call next()", desc: "Invoke next() to pass control onward to the next middleware in the stack." },
      ],
    },
    part2: {
      title: "The Standard Middleware Signature",
      intro: "Standard Express middleware functions receive three arguments:",
      cards: [
        { number: "req", tag: "First Arg", title: "The Request Object", description: "Read incoming data, headers, URL, or attach custom properties.", color: "purple" },
        { number: "res", tag: "Second Arg", title: "The Response Object", description: "Use to send an early response if a condition fails.", color: "emerald" },
        { number: "next", tag: "Third Arg", title: "The next() Function", description: "Crucial callback that signals Express to advance to the next middleware.", color: "amber" },
      ],
      rule: {
        title: "The Middleware Dilemma",
        content: "Every middleware function MUST do one of two things: either send a response (res.json, res.send) OR call next(). If it does neither, the request hangs forever.",
      },
    },
    part3: {
      title: "Mental Model: The Assembly Line",
      intro: "Think of Express middleware as workers on an assembly line:",
      points: [
        { title: "Worker 1 (Logger)", content: "Logs the arrival time on the clipboard, then passes the box to Worker 2: next()." },
        { title: "Worker 2 (Security Guard)", content: "Inspects the badge. If invalid, rejects the box immediately: res.status(401).json(). If valid, passes to Worker 3: next()." },
        { title: "Worker 3 (JSON Parser)", content: "Unpacks the box content into req.body and passes to the Painter: next()." },
        { title: "Worker 4 (Route Handler)", content: "Paints the final product and ships it to the customer: res.json(product)." },
      ],
    },
    part4: {
      title: "Code Comparison: Custom Logger Middleware",
      bad: {
        title: "Forgot to call next() (Hangs Request)",
        code: `app.use((req, res, next) => {
  console.log(\`Received \${req.method} \${req.url}\`);
  // BUG: Forgot next()! Request stops here forever!
});

app.get('/users', (req, res) => {
  res.json({ users: [] }); // This code is NEVER reached!
});`,
        explanation: "Because next() was omitted, Express never executes the subsequent route handler.",
      },
      good: {
        title: "Proper Middleware with next()",
        code: `// Clean request logger middleware
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Hands control to the next middleware
});

app.get('/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob'] });
});`,
        explanation: "Executes logging logic and promptly calls next() to keep the request pipeline moving smoothly.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Create a request timestamp middleware and observe req enrichment:",
      starterCode: `const express = require('express');
const app = express();

// Custom enrichment middleware
app.use((req, res, next) => {
  req.receivedAt = Date.now();
  req.requestId = 'req_' + Math.random().toString(36).substr(2, 9);
  next();
});

app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    requestId: req.requestId,
    processingTimeMs: Date.now() - req.receivedAt
  });
});
`,
    },
    part6: {
      title: "Concept Check",
      quiz: {
        question: "What happens if a custom middleware function does not call next() and does not send a response with res?",
        options: [
          "Express automatically skips to the matching route handler.",
          "The request hangs indefinitely and the client eventually receives a timeout error.",
          "Express throws a 'Missing next() callback' runtime error.",
          "The request is automatically redirected to '/'.",
        ],
        correctIndex: 1,
        explanation: "If middleware neither terminates the response nor calls next(), Express halts execution on that step, leaving the client hanging until a timeout occurs.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Middleware is (req, res, next)", desc: "A function that processes requests along the Express pipeline." },
        { title: "Always Call next() or Respond", desc: "Never leave a middleware hanging without calling next() or sending a response." },
        { title: "Enrich req Safely", desc: "Attach authenticated user data or request IDs directly to the req object for downstream handlers." },
      ],
      nextLessonPreview: {
        title: "EXP-11: Application-Level vs Router-Level vs Route-Level Middleware",
        desc: "Learn how to scope middleware globally, to routers, or to individual endpoints.",
      },
    },
  },
};

/**
 * Helper to retrieve lesson content by slug or code
 */
export function getExpressLessonContent(slugOrCode: string): ExpressLessonContent {
  const normalized = slugOrCode.toLowerCase();
  
  // Direct key lookup
  if (EXPRESS_LESSONS_CONTENT[normalized]) {
    return EXPRESS_LESSONS_CONTENT[normalized];
  }

  // Value search by slug or code
  const entry = Object.values(EXPRESS_LESSONS_CONTENT).find(
    (c) => c.slug.toLowerCase() === normalized || c.code.toLowerCase() === normalized
  );

  if (entry) return entry;

  // Fallback default generator for remaining lessons if requested before lazy load
  return generateDefaultLessonContent(slugOrCode);
}

function generateDefaultLessonContent(slug: string): ExpressLessonContent {
  return {
    slug,
    code: "EXP",
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    subtitle: "Master this fundamental Express.js backend concept with clear explanations, practical code, and step-by-step best practices.",
    sections: [
      { id: "part1", label: "Core Concept & Why It Matters", icon: "💡" },
      { id: "part2", label: "Mental Model & Architecture", icon: "⚙️" },
      { id: "part3", label: "Step-by-Step Implementation", icon: "🧩" },
      { id: "part4", label: "Bad Pattern vs Best Practice", icon: "⚖️" },
      { id: "part5", label: "Interactive Code Playground", icon: "⚡" },
      { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
      { id: "part7", label: "Takeaways & Next Steps", icon: "🚀" },
    ],
    part1: {
      title: "Why This Concept Matters in Express",
      bigPicture: `Understanding ${slug} is essential for building scalable, production-grade Express web servers and REST APIs. It ensures clean separation of concerns, robust error resilience, and predictable request lifecycle behavior.`,
      breakdownTitle: "Key Principles:",
      breakdownItems: [
        { title: "Clear Architecture", desc: "Isolates responsibilities cleanly along the Express middleware and routing pipeline." },
        { title: "Predictable Request Flow", desc: "Ensures every client request is correctly processed and terminated without hanging." },
        { title: "Production Reliability", desc: "Protects against uncaught runtime exceptions and security vulnerabilities." },
      ],
    },
    part2: {
      title: "Mental Model & Architecture",
      intro: "Understand the mechanics of how Express executes this feature during the request-response cycle:",
      cards: [
        { number: "01", tag: "Incoming", title: "Request Stage", description: "Express receives the HTTP request and runs matching pipeline functions.", color: "purple" },
        { number: "02", tag: "Processing", title: "Handler Logic", description: "Executes business logic, input validation, or middleware transformations.", color: "emerald" },
        { number: "03", tag: "Outgoing", title: "Response Stage", description: "Serializes the output payload and closes the HTTP connection socket cleanly.", color: "cyan" },
      ],
      rule: {
        title: "Express Core Rule",
        content: "Always keep route handlers focused on HTTP coordination and delegate complex business rules to dedicated service layers.",
      },
    },
    part3: {
      title: "Step-by-Step Implementation Details",
      intro: "Follow these production-tested patterns when implementing this in your codebase:",
      points: [
        { title: "1. Encapsulate Logic", content: "Keep functions small, pure, and easy to unit test independently." },
        { title: "2. Handle Edge Cases", content: "Always provide fallback error handling and validate input parameters before execution." },
        { title: "3. Clean Response Contracts", content: "Return consistent JSON payloads ({ success: true, data: ... }) across all routes." },
      ],
    },
    part4: {
      title: "Bad Pattern vs Recommended Approach",
      bad: {
        title: "Anti-Pattern (Tightly Coupled & Fragile)",
        code: `// Fragile implementation with missing error guards
app.post('/api/resource', (req, res) => {
  const data = req.body;
  // Missing validation and try/catch
  database.save(data);
  res.send('Done');
});`,
        explanation: "Lacks validation, fails to handle async errors, and uses ambiguous plain-text response format.",
      },
      good: {
        title: "Production Best Practice (Clean & Safe)",
        code: `// Robust implementation with validation & typed JSON
app.post('/api/resource', (req, res, next) => {
  try {
    const { name, value } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const result = service.create({ name, value });
    return res.status(201).json({ success: true, data: result });
  } catch (err) {
    return next(err);
  }
});`,
        explanation: "Safely validates inputs, returns structured 400/201 responses, and forwards exceptions to centralized error middleware.",
      },
    },
    part5: {
      title: "Interactive Code Playground",
      intro: "Test and inspect this Express.js pattern directly in the playground:",
      starterCode: `const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/demo', (req, res) => {
  res.json({
    status: 'ok',
    topic: '${slug}',
    message: 'Pattern running successfully in LearnCraft!'
  });
});
`,
    },
    part6: {
      title: "Knowledge Check",
      quiz: {
        question: "What is the primary benefit of adhering to Express.js modular design principles?",
        options: [
          "It forces the browser to run faster on client machines.",
          "It promotes clean separation of concerns, easier testing, and predictable request lifecycle handling.",
          "It eliminates the need for Node.js on the server.",
          "It automatically encrypts all database passwords.",
        ],
        correctIndex: 1,
        explanation: "Modular Express architecture separates routing, middleware, controllers, and error handling, making applications maintainable, testable, and robust.",
      },
    },
    part7: {
      title: "Summary & Key Takeaways",
      takeaways: [
        { title: "Separate Concerns", desc: "Keep routes, middleware, and business services in dedicated files." },
        { title: "Validate Inputs", desc: "Never trust raw client request bodies without schema verification." },
        { title: "Centralize Errors", desc: "Forward unexpected errors to dedicated 4-argument error middleware via next(err)." },
      ],
      nextLessonPreview: {
        title: "Continue Your Express.js Journey",
        desc: "Advance to the next sequenced lesson to master the complete Express stack.",
      },
    },
  };
}
