# LearnCraft Express.js Curriculum

## Learning goal

Understand the main ideas behind Express.js so you can read API code, build routes with AI's help, spot common problems, and explain important concepts in simple words. You do not need to memorize every Express feature.

**Teaching rule:** Easy topics stay short. Moderate topics get a clear explanation and a practical example. Difficult topics are explained step by step. Every lesson has a scenario question and a simple model answer. Interview questions appear only for important topics.

**Version note:** Examples use Express 5 and modern JavaScript. Some behavior differs in Express 4, especially automatic forwarding of rejected promises from async route handlers. Check the version in your own project before copying examples.

---

# Part 1: Understand Express.js

## Lesson 1: What Is Express.js?

**Difficulty: Easy**

Express.js is a small framework for Node.js that makes it easier to build web servers and APIs. It helps you decide what your server should do when a request arrives.

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from my server!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

**How it works**

1. `express()` creates an Express application.
2. `app.get('/')` says what to do when someone sends a GET request to `/`.
3. `res.send()` sends a response back to the visitor.
4. `app.listen(3000)` starts the server on port 3000.

**Why it matters:** Express gives your backend a clear way to receive requests and send responses.

**Scenario:** You open your browser at your server's home URL, but you want it to show a welcome message. What part of this example handles that?

**Simple answer:** The `app.get('/')` route handles the request, and `res.send()` sends the welcome message.

## Lesson 2: Starting an Express Project

**Difficulty: Easy**

You can add Express to a Node.js project with a package manager.

```bash
npm init -y
npm install express
```

Create a file named `server.js` and add a small Express server. Run it with:

```bash
node server.js
```

**How it works**

1. `npm init -y` creates a basic `package.json` file.
2. `npm install express` adds Express to the project.
3. `node server.js` runs your server file.

For a real project, add a start script to `package.json` so the command is easy to remember. You do not need to learn every npm command in this lesson.

**Scenario:** Your terminal says it cannot find the `express` package. What should you check first?

**Simple answer:** Check that Express was installed in this project by running `npm install express` in the project folder, and make sure you are running the file from the correct project.

## Lesson 3: Requests and Responses

**Difficulty: Moderate**

A **request** is what a client sends to your server. A **response** is what your server sends back.

In Express, `req` contains details about the request, and `res` is used to send the response.

```js
app.get('/hello', (req, res) => {
  res.status(200).send('Hello!');
});
```

**Step by step**

1. A client sends a GET request to `/hello`.
2. Express finds this route.
3. `res.status(200)` sets the HTTP status to `200`, which means the request succeeded.
4. `res.send('Hello!')` sends the response. This finishes the response for this route.

Do not send multiple separate responses for one request. For example, calling `res.send()` twice can cause an error.

**Scenario:** Your route sends a response, then tries to send another one. Why can this fail?

**Simple answer:** The response has already been sent. A route should normally send one final response, or pass control to the next handler when appropriate.

## Lesson 4: HTTP Methods and Status Codes

**Difficulty: Moderate**

HTTP methods describe the kind of action a client is asking for. Status codes describe the result.

- `GET`: read data.
- `POST`: create something or submit data.
- `PUT` or `PATCH`: update data.
- `DELETE`: remove data.
- `200`: success.
- `201`: something was created.
- `400`: the request is invalid.
- `404`: the requested item was not found.
- `500`: an unexpected server problem occurred.

```js
app.get('/products', (req, res) => {
  res.status(200).json([{ id: 1, name: 'Notebook' }]);
});

app.post('/products', (req, res) => {
  res.status(201).json({ message: 'Product created' });
});
```

These examples show the response shape; a real POST route must validate the submitted data and save it before claiming that the product was created.

**Scenario:** A client asks for product ID 99, but that product does not exist. Which status code is usually appropriate?

**Simple answer:** `404 Not Found`, because the requested product was not found.

**Important interview question:** What is the difference between a request method and a status code?

**Simple answer:** The method describes what the client wants to do. The status code describes what happened to the request.

---

# Part 2: Routes and Middleware

## Lesson 5: Routes and Route Parameters

**Difficulty: Moderate**

A **route** connects an HTTP method and a URL pattern to code that handles the request. A route parameter lets the URL carry a value, such as an ID.

```js
app.get('/users/:id', (req, res) => {
  res.json({ userId: req.params.id });
});
```

If the client requests `/users/42`, `req.params.id` is the string `'42'`.

**Step by step**

1. `:id` marks a named part of the URL.
2. Express puts the matched value in `req.params.id`.
3. The handler sends that value back as JSON.

Route parameters are strings. If you need a number, check and convert the value carefully instead of assuming it is valid.

**Scenario:** Your route is `/orders/:id`, and the client requests `/orders/15`. Where do you read `15`?

**Simple answer:** Use `req.params.id`. The value is a string, so validate it before using it as a number.

## Lesson 6: Query Parameters

**Difficulty: Easy**

Query parameters are values added after `?` in a URL. They are often used for search, filtering, sorting, or pagination.

```js
app.get('/products', (req, res) => {
  const category = req.query.category;
  res.json({ category });
});
```

For `/products?category=books`, Express reads the query value from `req.query.category`.

**How it works**

1. The client sends the query in the URL.
2. Express parses the query string.
3. Your handler reads the value from `req.query`.
4. Your code should validate it before trusting it.

Query values are not automatically safe numbers or valid choices. Their exact shape can depend on the query parser and input.

**Scenario:** You want `/products?search=pen` to search products. Which request property should you check?

**Simple answer:** Check `req.query.search`, then validate and use the search text.

## Lesson 7: Reading a Request Body

**Difficulty: Moderate**

When a client sends data in a POST or PATCH request, the data is often in the request body. For JSON, add `express.json()` before the routes that need it.

```js
app.use(express.json());

app.post('/users', (req, res) => {
  const name = req.body.name;
  res.status(201).json({ name });
});
```

**Step by step**

1. `app.use(express.json())` adds middleware that reads supported JSON request bodies.
2. The client sends JSON, for example `{ "name": "Ava" }`.
3. Express parses it and places the result in `req.body`.
4. The route reads `req.body.name`.

Parsing is not the same as validation. A client can send missing or incorrect values, so check the body before using it. In Express 5, `req.body` can be `undefined` if no body was parsed.

**Scenario:** `req.body.name` is undefined. What should you check?

**Simple answer:** Check that `express.json()` is registered before the route, that the client sends valid JSON with the right content type, and that the body actually includes `name`.

## Lesson 8: Middleware

**Difficulty: Difficult**

Middleware is a function that runs while Express handles a request. It can read or change request details, send a response, or pass control to the next middleware or route handler.

```js
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('Home page');
});
```

**Step by step**

1. A request reaches the server.
2. The middleware logs the method and URL.
3. `next()` tells Express to continue to the next matching handler.
4. The route sends the response.

If middleware neither sends a response nor calls `next()`, the request may hang. Middleware order matters: register body parsing before routes that need the body.

**Why it matters:** Middleware is used for logging, parsing request bodies, checking authentication, and handling many shared tasks.

**Scenario:** You add logging middleware, but requests never reach the route. What might be missing?

**Simple answer:** The middleware may not call `next()` or send a response. If it is meant to let the request continue, call `next()`.

**Important interview question:** What is middleware in Express?

**Simple answer:** Middleware is a function that runs during request handling. It can do shared work, end the response, or pass control to the next handler.

## Lesson 9: Routers and Organizing Routes

**Difficulty: Moderate**

An Express Router lets you group related routes in a separate file. This keeps a growing server easier to read.

```js
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Ava' }]);
});

module.exports = router;
```

```js
// server.js
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
```

**How it works**

1. The router defines a route for `/` within the users group.
2. `app.use('/users', usersRouter)` adds `/users` as the base path.
3. The combined endpoint becomes `GET /users`.

**Scenario:** Your server has many user routes and the main file is becoming hard to read. What can you do?

**Simple answer:** Move related user routes into an Express Router and mount it under `/users`.

---

# Part 3: Build Useful APIs

## Lesson 10: Sending JSON and Choosing a Response

**Difficulty: Easy**

APIs often send JSON because it represents objects and lists in a form clients can use.

```js
app.get('/profile', (req, res) => {
  res.status(200).json({ name: 'Ava', role: 'learner' });
});
```

`res.json()` sends a JSON response. `res.status(200)` sets the success status. You can combine the status and response in one chain as shown.

**Scenario:** Your React app needs a user's name from an API. What should the Express route return?

**Simple answer:** It can return a JSON object such as `{ name: 'Ava' }` using `res.json()`.

## Lesson 11: Build REST-Style Routes

**Difficulty: Moderate**

A REST-style API uses URLs to identify resources and HTTP methods to describe actions. For example, `/tasks` represents tasks, while `/tasks/7` represents one task.

```js
app.get('/tasks', listTasks);
app.get('/tasks/:id', getTask);
app.post('/tasks', createTask);
app.patch('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);
```

These lines show the route design only; the named handler functions must be defined elsewhere.

**Step by step**

1. Use `GET /tasks` to list tasks.
2. Use `GET /tasks/7` to read one task.
3. Use `POST /tasks` to create a task.
4. Use `PATCH /tasks/7` to update part of a task.
5. Use `DELETE /tasks/7` to delete a task.

A route design should be consistent. Each handler still needs correct validation, status codes, and data storage.

**Scenario:** You need to change only a task's title. Which method is commonly used?

**Simple answer:** `PATCH /tasks/:id` is a common choice for updating part of a resource.

**Important interview question:** What makes an API REST-style?

**Simple answer:** It uses clear resource URLs and standard HTTP methods and status codes in a consistent way. A real API may follow REST principles to different degrees.

## Lesson 12: Validate User Input

**Difficulty: Moderate**

Validation checks whether submitted data follows the rules your application needs. Never trust request data just because it came from your own frontend.

```js
app.use(express.json());

app.post('/tasks', (req, res) => {
  const title = req.body?.title;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'A task title is required' });
  }

  res.status(201).json({ task: { title: title.trim() } });
});
```

**Step by step**

1. Read the title from the request body.
2. Check that it is a string.
3. Check that it is not empty after trimming spaces.
4. If it is invalid, return `400 Bad Request` and stop the handler.
5. If it is valid, continue with the task-creation logic.

This example shows the validation flow; it does not save the task to a database.

**Scenario:** A client sends `{ "title": "   " }`. Should your API accept it?

**Simple answer:** No. Trimming the text leaves an empty string, so the API should return a validation error.

## Lesson 13: Handling Errors

**Difficulty: Difficult**

Errors happen when something goes wrong, such as invalid input or a failed operation. Express lets you send errors to a central error-handling middleware so routes do not each need their own full error response logic.

```js
app.get('/example', (req, res, next) => {
  try {
    throw new Error('Something went wrong');
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
```

**Step by step**

1. The route encounters an error.
2. `next(error)` passes it to error-handling middleware.
3. The error middleware logs the details for the server team.
4. It sends a simple error response to the client.

Error-handling middleware has four parameters: `(err, req, res, next)` and should be registered after routes. Do not send private stack traces to users in production.

In Express 5, errors thrown by or rejected from async route handlers are forwarded automatically. Older Express 4 projects often need explicit `.catch(next)` or a wrapper for async handlers.

**Scenario:** An API fails and returns a database stack trace to the browser. What should you change?

**Simple answer:** Log the detailed error on the server, but send the client a safe, general message that does not expose internal details.

**Important interview question:** What is error-handling middleware?

**Simple answer:** It is middleware with four parameters that receives errors and sends a consistent response or passes the error along.

## Lesson 14: Async Route Handlers

**Difficulty: Moderate**

A route often waits for another operation, such as reading data from a service. An `async` function lets you use `await` to write that flow clearly.

```js
app.get('/report', async (req, res) => {
  const report = await getReport();
  res.json(report);
});
```

This example assumes `getReport()` is a function defined elsewhere that returns a Promise.

**Step by step**

1. The client requests `/report`.
2. The route calls `getReport()`.
3. `await` waits for the Promise to settle successfully.
4. The route sends the result as JSON.

With Express 5, a thrown error or rejected Promise from this async handler is forwarded to error-handling middleware. The error handler must still be set up. Be aware of this version difference if maintaining an Express 4 project.

**Scenario:** `getReport()` rejects with an error in Express 5. Where can the error go?

**Simple answer:** Express forwards it to the error-handling middleware, where the app can log it and return an appropriate response.

## Lesson 15: Separate Route Logic From Business Logic

**Difficulty: Moderate**

A route handler receives the request and sends the response. A separate function or service can handle the work the application needs to do. Keeping these responsibilities separate can make code easier to test and change.

```js
async function getWelcomeMessage(name) {
  return `Welcome, ${name}`;
}

app.get('/welcome/:name', async (req, res) => {
  const message = await getWelcomeMessage(req.params.name);
  res.json({ message });
});
```

**How it works**

1. The route reads the name from the URL.
2. It calls `getWelcomeMessage()` to produce the message.
3. It sends the result as JSON.

For a tiny app, a separate service is not always necessary. Split code when the logic is reused or makes the route hard to understand.

**Scenario:** The same pricing calculation is needed by three routes. Should you copy it three times?

**Simple answer:** Usually not. Put the calculation in a reusable function and call it from each route.

---

# Part 4: Middleware, Access, and Safety

## Lesson 16: CORS

**Difficulty: Moderate**

CORS is a browser rule that controls whether a page from one origin can read a response from another origin. An origin is based on the protocol, hostname, and port.

If your frontend runs at `http://localhost:3000` and your API runs at `http://localhost:4000`, they have different origins.

```js
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));
```

This example uses the `cors` package, which must be installed. It allows browser code from the listed origin to read responses, subject to the configured CORS rules.

CORS is **not authentication**. It does not stop tools such as `curl` or other servers from sending requests to your API.

**Scenario:** You set CORS, but someone can still call the endpoint with an API tool. Is that a CORS failure?

**Simple answer:** No. CORS is mainly enforced by browsers. Use authentication and authorization when an endpoint needs access control.

## Lesson 17: Authentication and Authorization Basics

**Difficulty: Moderate**

Authentication asks, “Who are you?” Authorization asks, “Are you allowed to do this?” Express does not automatically provide a complete login system; applications add suitable authentication tools and checks.

A protected route should check the user's identity and permissions before returning private data or changing it.

```js
function requireAdmin(req, res, next) {
  // Example only: in a real app, use a trusted authentication system.
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
}

app.delete('/admin/reports', requireAdmin, (req, res) => {
  res.json({ message: 'Report deleted' });
});
```

This snippet assumes earlier authentication middleware has set `req.user`. It is not a complete authentication system.

**Step by step**

1. Authentication middleware verifies the user and sets trusted user details.
2. `requireAdmin` checks the user's role.
3. If the user is not an admin, the route returns `403 Forbidden`.
4. If the user is an admin, `next()` lets the request continue.

**Scenario:** A logged-in user tries to delete an admin-only report. Does being logged in mean they are allowed?

**Simple answer:** No. Authentication proves who the user is; authorization checks whether that user has permission.

## Lesson 18: Basic Express Security

**Difficulty: Moderate**

An API must treat client input as untrusted and avoid exposing secret information. Useful starting points include validating input, using HTTPS in production, keeping dependencies updated, limiting repeated login attempts where appropriate, and setting security headers with tools such as Helmet.

```js
const helmet = require('helmet');
app.use(helmet());
```

Install Helmet before using this example. It sets several security-related HTTP headers. It does not replace authentication, validation, safe database queries, or HTTPS.

Never send private keys or detailed internal errors to the frontend. Store secrets in environment variables and keep them out of source control.

**Scenario:** Your API key is written directly in a file that you committed to a public repository. What should you do?

**Simple answer:** Remove the key from the code, move it to a secure environment variable, and rotate the exposed key. Deleting it from the latest file alone may not remove it from version history.

## Lesson 19: Environment Variables and Configuration

**Difficulty: Easy**

Environment variables let an app read settings from its environment rather than hard-coding them in source files.

```js
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

**How it works**

1. The app checks whether `PORT` is set.
2. If it is set, the server uses that value.
3. If it is not set, the example uses port `4000`.

Environment variable values are commonly strings, so convert and validate them when a number or another format is required. Do not commit secret `.env` files to a public repository.

**Scenario:** Your app works locally but uses the wrong port in production. What should you check?

**Simple answer:** Check the deployment environment's `PORT` value and make sure the server reads it correctly.

---

# Part 5: Improve and Test an Express API

## Lesson 20: Testing Express Routes

**Difficulty: Moderate**

Tests help check that your API returns the expected status codes and data. For example, a test can confirm that `GET /health` returns a success response.

A typical Express test uses a test framework and an HTTP testing library such as Supertest. These packages must be installed and configured in the project.

```js
const request = require('supertest');
const app = require('./app');

test('GET /health returns ok', async () => {
  const response = await request(app).get('/health');

  expect(response.status).toBe(200);
  expect(response.body).toEqual({ status: 'ok' });
});
```

This is an example for Jest and Supertest. It assumes the project exports the Express app from `app.js` and defines `GET /health`. Keep `app.listen()` in a separate entry file so tests can import the app without starting a separate server.

**Scenario:** Your route worked when you tried it manually, but later a code change broke it. How can a test help?

**Simple answer:** The test makes the request again and checks the response. It can quickly show that the route no longer behaves as expected.

## Lesson 21: Logging and Debugging Requests

**Difficulty: Moderate**

When an API behaves incorrectly, logs help you see which request arrived and where a problem happened. Log useful information, but avoid logging passwords, access tokens, or private user data.

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

**How it works**

1. Every request that reaches this middleware is logged.
2. The log records the method and URL.
3. `next()` allows request handling to continue.

In a larger app, use a suitable logging library and structured logs. This example is a starting point, not a complete production logging setup.

**Scenario:** Users report an error, but you cannot tell which route they called. What could help?

**Simple answer:** Add request logging and safe error logging so you can follow the request and find where the problem happens. Do not log secrets.

## Lesson 22: Build a Small REST API

**Difficulty: Moderate**

Use the main Express concepts together by building a small task API. This example uses an in-memory array, so tasks disappear when the server restarts. It is for learning route behavior, not for production data storage.

```js
const express = require('express');
const app = express();
app.use(express.json());

const tasks = [{ id: 1, title: 'Learn Express' }];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const title = req.body?.title;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'A title is required' });
  }

  const task = { id: tasks.length + 1, title: title.trim() };
  tasks.push(task);
  res.status(201).json(task);
});

app.listen(4000, () => console.log('API running on port 4000'));
```

**Step by step**

1. `express.json()` reads JSON request bodies.
2. `GET /tasks` returns the current list.
3. `POST /tasks` reads and validates the title.
4. If the title is invalid, the route returns `400` and stops.
5. If the title is valid, the route creates a task, adds it to the array, and returns `201 Created`.

This mini-project brings routes, requests, responses, validation, and status codes together. A real app should use reliable storage and handle IDs and errors more carefully.

**Scenario:** A request to create a task has no title. What should happen?

**Simple answer:** The API should return `400 Bad Request` and a helpful error message, without adding an invalid task.

---

# Keep this track focused

This Express.js curriculum covers the main ideas needed to read and build Express APIs. It deliberately does not teach separate courses on Node.js, databases, ORMs, authentication providers, Docker, or deployment. Those topics belong in their own learning tracks. Some lessons mention these topics only where needed to explain an Express concept.

## Official references

- Express 5 guide: https://expressjs.com/en/5x/api.html
- Routing: https://expressjs.com/en/guide/routing.html
- Middleware: https://expressjs.com/en/guide/using-middleware.html
- Error handling: https://expressjs.com/en/5x/guide/error-handling.html
- Express 5 migration guide: https://expressjs.com/en/guide/migrating-5/
- Production security: https://expressjs.com/en/advanced/best-practice-security.html
