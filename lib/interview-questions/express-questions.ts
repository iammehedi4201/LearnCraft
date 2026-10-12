import { InterviewQuestion } from "@/types/interview";

export const EXPRESS_QUESTIONS: InterviewQuestion[] = [
  {
    id: "express-q01",
    trackKey: "express",
    category: "Middleware & Error Handling",
    subtopic: "Error Middleware",
    type: "coding",
    difficulty: "easy",
    source: "curated",
    question: "How does error-handling middleware work in Express, and why must it have 4 parameters?",
    codeSnippet: `// Which of these is the correct error handling middleware signature?
app.use((err, req, res) => {
  res.status(500).send("Error");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});`,
    answer: `### Simple answer:
The **second snippet** with 4 parameters \`(err, req, res, next)\` is the only valid error handler in Express.

### Why the 4 Parameters Matter:
Express inspects the function's \`Function.prototype.length\` (arity) at runtime:
- If \`fn.length === 4\`, Express registers it as an **Error Handling Middleware**.
- If \`fn.length < 4\`, Express treats it as a standard request middleware. A 3-parameter function \`(err, req, res)\` will mistakenly receive \`req\` in the first argument, \`res\` in the second, and \`next\` in the third, completely failing to catch errors!

### Best Practice Centralized Error Handler:
\`\`\`javascript
// Must be registered LAST, after all app.use() routes
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});
\`\`\`

### Interview answer:
Express identifies error-handling middleware by checking function arity (\`fn.length === 4\`). It must accept four arguments: \`(err, req, res, next)\`. It must be placed after all route handlers so that any error passed to \`next(err)\` forwards directly to it.`,
    followUps: [
      "What happens in Express 4 vs Express 5 when an asynchronous route handler throws an unhandled Promise rejection?",
      "Why must error-handling middleware be registered as the very last app.use() in the file?",
      "How does next(new Error()) forward control directly to the error handling middleware?"
    ],
    keyPoints: [
      "Error middleware must explicitly have 4 arguments (err, req, res, next)",
      "Express inspects fn.length to identify error handlers",
      "Must be placed after all routes",
      "In Express 4, async errors require calling next(err) or using express-async-errors"
    ],
    tags: ["express", "middleware", "error-handling", "nodejs", "rest-api"],
    relatedLessonSlug: "/learn/express/exp04-error-handling-and-middleware",
    relatedLessonName: "EXP-04: Robust Error Handling & Middleware Ordering"
  },
  {
    id: "express-q02",
    trackKey: "express",
    category: "Fundamentals & Middleware",
    subtopic: "Middleware Concept",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is Express.js, and what is the core concept of Middleware?",
    answer: `### Simple answer:
Express.js is a minimalist, unopinionated web framework for Node.js. In Express, **almost everything is a middleware function**.

### What is Middleware?
Middleware functions are functions that have access to the Request object (\`req\`), the Response object (\`res\`), and the \`next\` function in the application’s request-response cycle.

### What Middleware can do:
1. Execute any code (e.g. logging, analytics).
2. Make changes to the request and response objects (e.g. attach \`req.user\`).
3. End the request-response cycle by sending data (e.g. \`res.json()\`).
4. Call the **\`next()\`** function to pass control to the next middleware in the stack.

### Example:
\`\`\`javascript
// Custom logging middleware:
const requestLogger = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Pass control to the next middleware!
};

app.use(requestLogger);
\`\`\`

### What happens if you forget \`next()\`?
If a middleware does not send a response and does not call \`next()\`, the request **hangs forever** until the browser times out!

### Interview answer:
Express is a minimalist web framework structured around a middleware pipeline. Middleware functions receive \`req\`, \`res\`, and \`next\`, allowing developers to inspect requests, mutate context, send responses, or delegate control to subsequent handlers via \`next()\`.`,
    followUps: [
      "What are the 5 types of middleware in Express (Application, Router, Error, Built-in, Third-party)?",
      "What happens if you send a response and also call next()?",
      "Why is Express called an 'unopinionated' framework?"
    ],
    keyPoints: [
      "Middleware has signature (req, res, next)",
      "Can modify req/res objects (e.g. req.user)",
      "Must either send a response (res.send) or call next() to avoid hanging",
      "Chained sequentially in order of registration"
    ],
    tags: ["express", "middleware", "next", "fundamentals", "web-framework"],
    relatedLessonSlug: "/learn/express/exp01-what-is-express",
    relatedLessonName: "EXP-01: Express.js Architecture & Middleware Model"
  },
  {
    id: "express-q03",
    trackKey: "express",
    category: "Middleware & Routing",
    subtopic: "Middleware Ordering",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How does Middleware execution order work in Express, and what is the difference between `next()` and `next('route')`?",
    answer: `### Simple answer:
In Express, middleware and route handlers execute in the **exact order they are registered** using \`app.use()\` or HTTP method handlers (\`app.get()\`).

### Execution Order:
\`\`\`javascript
app.use((req, res, next) => {
  console.log("1: First middleware");
  next();
});

app.get("/users", (req, res, next) => {
  console.log("2: Route handler");
  res.send("Users list");
});

app.use((req, res, next) => {
  console.log("3: This will NOT run for /users because res.send() ended the cycle!");
});
\`\`\`

### \`next()\` vs \`next('route')\`:
- **\`next()\`**: Passes control to the next middleware in the current stack.
- **\`next('route')\`**: Skips the remaining middleware callbacks for the **current route definition** and jumps directly to the next route declaration. *(Only works inside route handlers loaded with \`app.METHOD()\` or \`router.METHOD()\`)*.

### Example \`next('route')\`:
\`\`\`javascript
app.get("/user/:id", (req, res, next) => {
  if (req.params.id === "0") {
    return next("route"); // Skip to next handler for /user/:id!
  }
  next(); // Continue to regular handler
}, (req, res) => {
  res.send("Regular user");
});

app.get("/user/:id", (req, res) => {
  res.send("Special guest user");
});
\`\`\`

### Interview answer:
Middleware executes sequentially in registration order. Calling \`next()\` passes control to the next handler in line, while calling \`next('route')\` skips any remaining callback functions in the current route block and jumps directly to the next matching route definition.`,
    followUps: [
      "Can next('router') be used to skip an entire express.Router() instance?",
      "What happens if an argument other than 'route' is passed to next(arg)?",
      "Why must body parsers be registered before route handlers?"
    ],
    keyPoints: [
      "Sequential execution based on registration order",
      "next() calls subsequent handler in stack",
      "next('route') skips remaining callbacks in current route handler",
      "Passing any error object to next(err) jumps immediately to error middleware"
    ],
    tags: ["middleware", "next", "next-route", "execution-order", "express"],
    relatedLessonSlug: "/learn/express/exp02-routing-and-controllers",
    relatedLessonName: "EXP-02: Advanced Routing & Middleware Stacks"
  },
  {
    id: "express-q04",
    trackKey: "express",
    category: "Routing & Architecture",
    subtopic: "express.Router",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is `express.Router()`, and how does it help modularize route definitions in large applications?",
    answer: `### Simple answer:
\`express.Router()\` creates a mini-Express application (an isolated instance of middleware and routing) that can be exported as a module and mounted onto a prefix in the main app.

### Without \`express.Router\` (Messy monolithic file):
Putting all routes for users, orders, and products in \`server.js\` results in thousands of unmaintainable lines.

### With \`express.Router\` (Modular architecture):
\`\`\`javascript
// routes/users.js:
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ users: ["Alice", "Bob"] });
});

router.get("/:id", (req, res) => {
  res.json({ userId: req.params.id });
});

export default router;
\`\`\`

\`\`\`javascript
// server.js:
import express from "express";
import userRouter from "./routes/users.js";

const app = express();

// Mount router under '/api/users' prefix:
app.use("/api/users", userRouter);

app.listen(3000);
\`\`\`

### Route Parameters (\`req.params\`):
Parameters declared with a colon (\`/:id\`) are extracted into \`req.params.id\`.

### Interview answer:
\`express.Router()\` creates modular, mountable route handlers that act like mini-applications. By organizing domain routes into separate files (e.g. \`users.js\`, \`orders.js\`) and mounting them via \`app.use('/prefix', router)\`, codebases stay cleanly structured and maintainable.`,
    followUps: [
      "How does the mergeParams: true option allow child routers to access parent params?",
      "What is router.param('id', (req, res, next, id) => ...) for param pre-loading?",
      "How do route path regexes work in Express (e.g. /ab?cd/)?"
    ],
    keyPoints: [
      "express.Router creates isolated modular routing sub-applications",
      "Mounted onto URL path prefixes with app.use('/prefix', router)",
      "Extracts dynamic path parameters via req.params",
      "Supports router-specific middleware chains"
    ],
    tags: ["router", "express-router", "modular-routing", "req-params"],
    relatedLessonSlug: "/learn/express/exp02-routing-and-controllers",
    relatedLessonName: "EXP-02: Advanced Routing & Middleware Stacks"
  },
  {
    id: "express-q05",
    trackKey: "express",
    category: "Request Handling",
    subtopic: "Body Parsing",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How do `express.json()` and `express.urlencoded()` work, and why was `body-parser` merged into Express?",
    answer: `### Simple answer:
In Node.js, incoming HTTP request bodies are sent as raw streams of binary data. By default, Express cannot read JSON request bodies (\`req.body\` is \`undefined\`). The built-in middleware \`express.json()\` and \`express.urlencoded()\` parse incoming byte streams into JavaScript objects.

### How to configure:
\`\`\`javascript
import express from "express";
const app = express();

// 1. Parses incoming requests with application/json headers:
app.use(express.json({ limit: "10mb" }));

// 2. Parses incoming HTML form data (application/x-www-form-urlencoded):
app.use(express.urlencoded({ extended: true }));

app.post("/api/users", (req, res) => {
  // Now req.body is a parsed JavaScript object!
  const { name, email } = req.body;
  res.json({ message: \`Created user \${name}\` });
});
\`\`\`

### What is \`extended: true\` in urlencoded?
- \`extended: false\`: Uses the built-in \`querystring\` library (simple key-value strings).
- \`extended: true\`: Uses the \`qs\` library, allowing nested objects and arrays in form submissions (\`user[name]=Alex\`).

### Historical note:
In Express 3, \`body-parser\` was built-in. It was removed in Express 4 as a separate npm package, but re-added directly into Express 4.16+ as \`express.json()\`.

### Interview answer:
Because Node HTTP requests are raw data streams, \`express.json()\` and \`express.urlencoded()\` parse incoming JSON and form payloads into JavaScript objects accessible on \`req.body\`. Setting \`extended: true\` allows parsing rich nested objects using the \`qs\` library.`,
    followUps: [
      "What happens if an invalid malformed JSON string is sent to express.json()?",
      "Why should you configure a payload size limit (e.g. limit: '100kb') to prevent DoS?",
      "What middleware is needed to parse multipart/form-data (file uploads)?"
    ],
    keyPoints: [
      "express.json() parses application/json into req.body",
      "express.urlencoded() parses HTML form data",
      "extended: true enables nested object parsing with qs library",
      "Always set size limits to prevent memory exhaustion attacks"
    ],
    tags: ["body-parser", "express-json", "urlencoded", "req-body"],
    relatedLessonSlug: "/learn/express/exp01-what-is-express",
    relatedLessonName: "EXP-01: Express.js Architecture & Middleware Model"
  },
  {
    id: "express-q06",
    trackKey: "express",
    category: "Static Assets",
    subtopic: "express.static",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How do you serve static files in Express using `express.static()`, and how do you configure caching headers?",
    answer: `### Simple answer:
\`express.static()\` is Express's built-in middleware for serving static assets like HTML files, CSS stylesheets, client-side JavaScript, images, and fonts directly from a folder.

### Basic Setup:
\`\`\`javascript
import express from "express";
import path from "node:path";

const app = express();

// Serve files from 'public' directory:
app.use(express.static(path.join(process.cwd(), "public")));

// Serve under a virtual path prefix:
app.use("/static", express.static(path.join(process.cwd(), "public")));
\`\`\`
Now, a file at \`public/images/logo.png\` is accessible at \`http://localhost:3000/static/images/logo.png\`.

### Production Caching Configuration:
In production, serve static assets with HTTP cache-control headers so browsers and CDNs cache them without repeatedly hitting your server:

\`\`\`javascript
app.use(express.static("public", {
  maxAge: "1d", // Cache for 1 day
  etag: true,   // Sends ETag headers for 304 Not Modified validation
  immutable: true,
}));
\`\`\`

### Production Architecture Note:
In high-traffic production environments, static files are usually served directly by a reverse proxy like **NGINX** or an **S3 + CDN (Cloudflare/CloudFront)** setup rather than having Node.js handle static file I/O.

### Interview answer:
\`express.static()\` serves static files from a designated directory and supports options like \`maxAge\` and \`etag\` for HTTP caching. While convenient in development, high-scale production systems typically offload static asset delivery to NGINX or a CDN to reduce Node.js CPU overhead.`,
    followUps: [
      "How does ETag validation enable HTTP 304 Not Modified responses?",
      "What is the dotfiles option in express.static?",
      "Why is a reverse proxy like NGINX more efficient at serving static files than Node.js?"
    ],
    keyPoints: [
      "express.static serves files from disk without custom route handlers",
      "Can be mounted on root or under virtual URL prefixes",
      "Supports maxAge and etag options for HTTP cache headers",
      "Production best practice is offloading static file serving to CDNs or NGINX"
    ],
    tags: ["express-static", "static-files", "caching", "etag", "performance"],
    relatedLessonSlug: "/learn/express/exp01-what-is-express",
    relatedLessonName: "EXP-01: Express.js Architecture & Middleware Model"
  },
  {
    id: "express-q07",
    trackKey: "express",
    category: "Security & Networking",
    subtopic: "CORS",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is CORS (Cross-Origin Resource Sharing), what is a Preflight Request, and how do you configure the `cors` package in Express?",
    answer: `### Simple answer:
CORS is a browser security mechanism that restricts a web page on one domain (e.g. \`http://localhost:3000\`) from making AJAX HTTP requests to a different domain or port (e.g. \`http://api.myapp.com:4000\`) unless the server explicitly permits it via response headers.

### What is a Preflight Request?
For requests that mutate data or use custom headers (like \`PUT\`, \`DELETE\`, or sending \`Authorization: Bearer <token>\`), browsers automatically send an **\`OPTIONS\` preflight request** first to ask the server: *"Are you willing to accept this request from my origin?"*

### Configuring the \`cors\` package:
\`\`\`javascript
import express from "express";
import cors from "cors";

const app = express();

// 1. Allow specific trusted origins:
const corsOptions = {
  origin: ["https://myapp.com", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions));
\`\`\`

### Common Bug:
If you use \`credentials: true\`, the \`origin\` header **cannot be wildcard \`*\`**! The browser will reject the response for security reasons.

### Interview answer:
CORS is an operating system and browser security policy restricting cross-origin requests. Non-simple requests trigger an automatic HTTP \`OPTIONS\` preflight check. We configure CORS in Express using the \`cors\` package by whitelisting trusted client origins, permitted HTTP methods, and enabling \`credentials: true\` for authenticated cookies.`,
    followUps: [
      "What constitutes a 'simple request' that skips the preflight OPTIONS check?",
      "Why does setting origin: '*' fail when credentials: true is enabled?",
      "How do you configure dynamic origin validation using a callback function in cors?"
    ],
    keyPoints: [
      "CORS is enforced by browsers, not servers or Postman",
      "Preflight OPTIONS request checks permissions for complex requests",
      "Access-Control-Allow-Origin header whitelists permitted domains",
      "credentials: true allows cookies and requires explicit non-wildcard origins"
    ],
    tags: ["cors", "preflight", "options", "security", "express"],
    relatedLessonSlug: "/learn/express/exp05-security-and-best-practices",
    relatedLessonName: "EXP-05: Express Security, CORS & Production Hardening"
  },
  {
    id: "express-q08",
    trackKey: "express",
    category: "Security & Authentication",
    subtopic: "JWT Authentication",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do you implement JWT (JSON Web Token) authentication middleware in Express to protect private routes?",
    answer: `### Simple answer:
JWT authentication works by having users log in, receiving a cryptographically signed token, and including that token in the \`Authorization: Bearer <token>\` HTTP header on subsequent requests. An Express authentication middleware verifies the token and attaches the decoded user to \`req.user\`.

### Middleware Implementation:
\`\`\`javascript
import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // Format: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: "Token is invalid or expired" });
    }

    // Attach decoded user payload to request:
    req.user = decodedUser;
    next(); // Proceed to protected route handler!
  });
}
\`\`\`

### Protecting Routes:
\`\`\`javascript
// Only authenticated users can access /api/profile:
app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({ message: \`Welcome, \${req.user.name}\`, userId: req.user.id });
});
\`\`\`

### Difference between 401 and 403:
- **401 Unauthorized:** No token provided or token invalid (user is not authenticated).
- **403 Forbidden:** User is authenticated, but does not have permission for this resource.

### Interview answer:
JWT middleware extracts the Bearer token from the \`Authorization\` header, verifies its cryptographic signature using \`jwt.verify()\`, and attaches the decoded user payload to \`req.user\` before calling \`next()\`. If missing or invalid, it returns 401 or 403 HTTP status codes immediately.`,
    followUps: [
      "Where should JWTs be stored on the client (HttpOnly cookies vs localStorage)?",
      "What is the difference between Access Tokens (short-lived) and Refresh Tokens (long-lived)?",
      "How do you revoke or invalidate a stateless JWT before its expiration date?"
    ],
    keyPoints: [
      "Extracts token from Authorization: Bearer <token> header",
      "jwt.verify() validates cryptographic signature and expiry",
      "Attaches verified payload to req.user for downstream handlers",
      "Returns 401 Unauthorized if missing, 403 Forbidden if invalid"
    ],
    tags: ["jwt", "authentication", "bearer-token", "security", "middleware"],
    relatedLessonSlug: "/learn/express/exp03-authentication-and-sessions",
    relatedLessonName: "EXP-03: JWT Authentication & Session Security"
  },
  {
    id: "express-q09",
    trackKey: "express",
    category: "Error Handling & Async",
    subtopic: "Async Error Handling",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How does asynchronous error handling differ between Express 4 and Express 5?",
    answer: `### Simple answer:
In **Express 4**, thrown errors inside \`async\` route handlers are unhandled Promise rejections that **never reach error middleware** unless you explicitly catch them and call \`next(err)\`. In **Express 5**, rejected Promises and async errors are caught **automatically**!

### Express 4 Problem:
\`\`\`javascript
// EXPRESS 4 (BUG! Process crashes or hangs):
app.get("/users", async (req, res) => {
  const users = await db.user.findMany(); // If DB throws error, it crashes!
  res.json(users);
});

// Express 4 Workaround (Manual try/catch or wrapper):
app.get("/users", async (req, res, next) => {
  try {
    const users = await db.user.findMany();
    res.json(users);
  } catch (err) {
    next(err); // Must explicitly pass to next(err) in Express 4!
  }
});
\`\`\`

### Common Express 4 Solution: Async Handler Wrapper
\`\`\`javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get("/users", asyncHandler(async (req, res) => {
  const users = await db.user.findMany();
  res.json(users);
}));
\`\`\`

### Express 5 Native Support:
Express 5 natively handles rejected promises from async functions automatically forwarding errors to your 4-parameter error middleware without wrappers.

### Interview answer:
In Express 4, asynchronous errors thrown inside async functions must be manually caught and forwarded with \`next(err)\` or wrapped with an async handler utility, otherwise they cause unhandled promise rejections. Express 5 natively catches rejected promises from async route handlers automatically.`,
    followUps: [
      "How does the express-async-errors npm package monkey-patch Express 4?",
      "Why did Express 4 not support async/await out of the box (historical callback design)?",
      "What new features and breaking changes were introduced in Express 5?"
    ],
    keyPoints: [
      "Express 4 requires try/catch with next(err) or asyncHandler wrapper",
      "Express 5 automatically catches rejected promises from async route handlers",
      "Unhandled promise rejections in Express 4 can crash the process in modern Node",
      "asyncHandler utility converts promise rejections to next(err)"
    ],
    tags: ["async-errors", "express4", "express5", "error-handling", "promises"],
    relatedLessonSlug: "/learn/express/exp04-error-handling-and-middleware",
    relatedLessonName: "EXP-04: Robust Error Handling & Middleware Ordering"
  },
  {
    id: "express-q10",
    trackKey: "express",
    category: "Security & Hardening",
    subtopic: "Security Headers & Rate Limiting",
    type: "security",
    difficulty: "medium",
    source: "curated",
    question: "How do `helmet` and `express-rate-limit` protect production Express applications against common web attacks?",
    answer: `### Simple answer:
- **\`helmet\`**: Sets secure HTTP response headers to protect against Cross-Site Scripting (XSS), clickjacking, MIME-type sniffing, and server fingerprinting.
- **\`express-rate-limit\`**: Restricts how many requests a client IP can make within a time window to prevent Denial of Service (DoS) and brute-force credential stuffing.

### 1. Hardening with Helmet:
\`\`\`javascript
import helmet from "helmet";

// Sets 15+ secure HTTP headers automatically:
app.use(helmet());
\`\`\`
Key headers configured:
- \`Content-Security-Policy\` (CSP): Restricts origins from which scripts, styles, and images can load.
- \`X-Frame-Options: DENY\`: Prevents page from being loaded in \`<iframe>\` to stop clickjacking.
- \`X-Content-Type-Options: nosniff\`: Prevents MIME-type confusion attacks.
- Hides \`X-Powered-By: Express\` so attackers cannot fingerprint the backend runtime.

### 2. Rate Limiting with express-rate-limit:
\`\`\`javascript
import rateLimit from "express-rate-limit";

// Limit all requests to 100 per 15 minutes:
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." }
});
app.use(globalLimiter);

// Strict limiter for sensitive login endpoint (5 attempts per 15 mins):
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts. Account temporarily locked." }
});
app.use("/api/auth/login", authLimiter);
\`\`\`

### Interview answer:
\`helmet\` hardens Express applications by configuring security headers (CSP, X-Frame-Options, HSTS) and removing the \`X-Powered-By\` fingerprint header. \`express-rate-limit\` prevents brute-force attacks and resource exhaustion by throttling request volume per IP address.`,
    followUps: [
      "Why must app.set('trust proxy', 1) be configured when using rate limiting behind a reverse proxy like NGINX?",
      "How do distributed rate limiters use Redis instead of in-memory memory stores?",
      "What is Content Security Policy (CSP) and why can it break inline scripts?"
    ],
    keyPoints: [
      "helmet sets secure HTTP response headers and hides X-Powered-By",
      "express-rate-limit mitigates brute-force attacks and API abuse",
      "Configure app.set('trust proxy', 1) when behind proxies to read correct client IP",
      "Production multi-instance deployments require Redis stores for rate limiting"
    ],
    tags: ["helmet", "rate-limiting", "security", "xss", "production-hardening"],
    relatedLessonSlug: "/learn/express/exp05-security-and-best-practices",
    relatedLessonName: "EXP-05: Express Security, CORS & Production Hardening"
  },
  {
    id: "express-q11",
    trackKey: "express",
    category: "File Uploads",
    subtopic: "Multer",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do you handle file uploads in Express using `multer` (`multipart/form-data`), and how do you enforce file type and size restrictions?",
    answer: `### Simple answer:
Standard body parsers (\`express.json\`) cannot handle binary file uploads. File uploads use the \`multipart/form-data\` encoding format, which is processed in Express using **\`multer\`**.

### Complete Upload Implementation:
\`\`\`javascript
import multer from "multer";
import path from "node:path";

// 1. Configure Storage (Disk or Memory):
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Validate File Types (Whitelist):
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and WebP allowed!"), false);
  }
};

// 3. Configure Upload instance:
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  fileFilter,
});

// 4. Route handler:
app.post("/api/upload-avatar", upload.single("avatar"), (req, res) => {
  // req.file contains file metadata:
  res.json({
    message: "File uploaded successfully!",
    filePath: req.file.path,
    size: req.file.size
  });
});
\`\`\`

### MemoryStorage vs DiskStorage:
- **\`diskStorage\`**: Writes files directly to local disk (good for VPS deployments).
- **\`memoryStorage\`**: Keeps file as a \`Buffer\` in RAM (good for immediately forwarding to cloud storage like AWS S3 or Cloudinary).

### Interview answer:
File uploads use \`multipart/form-data\` handled by \`multer\`. We configure storage (\`diskStorage\` or \`memoryStorage\`), enforce security by validating MIME types in \`fileFilter\`, and restrict payload sizes via \`limits: { fileSize }\` to protect server disks from abuse.`,
    followUps: [
      "Why should you never trust file.originalname extension without checking file.mimetype or magic numbers?",
      "How does upload.array('photos', 5) handle multiple file uploads?",
      "Why is MemoryStorage risky for large file uploads in Node.js?"
    ],
    keyPoints: [
      "multer handles multipart/form-data file uploads",
      "diskStorage saves to filesystem; memoryStorage keeps file Buffer in RAM",
      "Validate MIME types in fileFilter to prevent malicious executable uploads",
      "Set limits.fileSize to prevent disk and memory exhaustion"
    ],
    tags: ["multer", "file-uploads", "multipart-form-data", "security"],
    relatedLessonSlug: "/learn/express/exp01-what-is-express",
    relatedLessonName: "EXP-01: Express.js Architecture & Middleware Model"
  },
  {
    id: "express-q12",
    trackKey: "express",
    category: "Architecture & Design",
    subtopic: "Layered Architecture",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "How do you structure a production-grade Express application using the Controller-Service-Repository layered architecture?",
    answer: `### Simple answer:
In beginner Express apps, all routing, database queries, and business logic are written inside a single route callback. In production applications, we decouple code into three distinct architectural layers:

\`\`\`
HTTP Request
     │
     ▼
┌──────────────┐
│  Controller  │  Handles HTTP requests, extracts params, validates input, returns JSON
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Service    │  Contains pure business logic, calculations, and rules
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Repository  │  Communicates directly with database (Prisma, PostgreSQL, Mongoose)
└──────────────┘
\`\`\`

### Example:

\`\`\`javascript
// 1. Controller (HTTP interface):
export class UsersController {
  constructor(usersService) { this.usersService = usersService; }

  async registerUser(req, res, next) {
    try {
      const user = await this.usersService.register(req.body);
      return res.status(201).json({ success: true, data: user });
    } catch (err) { next(err); }
  }
}

// 2. Service (Business logic):
export class UsersService {
  constructor(usersRepository) { this.usersRepository = usersRepository; }

  async register({ email, password }) {
    const existing = await this.usersRepository.findByEmail(email);
    if (existing) throw new ConflictError("Email already registered");

    const passwordHash = await hashPassword(password);
    return this.usersRepository.create({ email, passwordHash });
  }
}

// 3. Repository (Data access):
export class UsersRepository {
  async findByEmail(email) { return prisma.user.findUnique({ where: { email } }); }
  async create(data) { return prisma.user.create({ data }); }
}
\`\`\`

### Benefits:
- **Testability:** You can unit test the \`UsersService\` business logic in isolation with mock repositories without running HTTP servers or databases.
- **Maintainability:** Changing the database (e.g. from Prisma to Mongo) only requires changing the Repository layer, leaving Controllers and Services untouched.

### Interview answer:
Layered architecture separates concerns into Controllers (handling HTTP status codes and payloads), Services (encapsulating core business rules), and Repositories (handling database persistence). This clean separation makes large Express codebases modular, easy to test, and resilient to database changes.`,
    followUps: [
      "How does this layered architecture prepare an Express application for migration to NestJS?",
      "Where does input validation (e.g. Zod schemas) live in this architecture?",
      "How does Dependency Injection fit into layered Express architectures?"
    ],
    keyPoints: [
      "Controller handles HTTP request/response parsing and status codes",
      "Service encapsulates business rules and calculations",
      "Repository encapsulates database queries and ORM calls",
      "Enables independent unit testing with mocked dependencies"
    ],
    tags: ["architecture", "clean-architecture", "controller-service", "design-patterns"],
    relatedLessonSlug: "/learn/express/exp02-routing-and-controllers",
    relatedLessonName: "EXP-02: Advanced Routing & Middleware Stacks"
  }
];
