# LearnCraft Next.js Curriculum: Core Concepts and Practical Scenarios

## Teaching rules

This curriculum uses the **Next.js App Router** and modern TypeScript examples. It focuses on what a beginner needs to understand to build apps, read AI-generated code, find problems, and explain important ideas in interviews.

- **Easy:** short explanation and one small example.
- **Moderate:** explain what it does, why it matters, and how to use it.
- **Difficult:** explain prerequisites and walk through the code step by step.
- Every lesson has a scenario question and a simple model answer.
- Interview questions appear only for important topics.
- Do not add extra theory or advanced details unless they help explain the core concept.

---

# Part 1: The Next.js Basics

## Lesson 1: What Is Next.js?
**Difficulty: Moderate**

### Core idea
Next.js is a framework built on React. React helps you build UI components. Next.js adds tools for building a complete website, such as routing, server rendering, data loading, and ways to handle pages and requests.

### Example
A basic page in `app/page.tsx`:

```tsx
export default function HomePage() {
  return <h1>Welcome to LearnCraft</h1>;
}
```

When a user visits `/`, Next.js uses this file to show the home page.

### Why it matters
You can build pages and app features without setting up routing and every server feature yourself.

### Scenario question
**You want to build a website with a home page, product pages, and a way to load product data. Why might you use Next.js instead of only React?**

**Simple answer:** React helps build the UI. Next.js also gives me routing and server-side tools to load data and build the full website in one framework.

---

## Lesson 2: The `app` Folder and Routes
**Difficulty: Easy**

### Core idea
In the App Router, folders inside `app` help define URLs. A `page.tsx` file makes that route a page.

```text
app/
  page.tsx          -> /
  about/
    page.tsx        -> /about
  contact/
    page.tsx        -> /contact
```

For example, `app/about/page.tsx` appears at `/about`.

### Why it matters
The file structure helps you understand where each page comes from.

### Scenario question
**You need to add an `/about` page. Which file do you create?**

**Simple answer:** Create `app/about/page.tsx` and export a React component from it.

---

## Lesson 3: Pages and Layouts
**Difficulty: Moderate**

### Core idea
A **page** shows the content for a route. A **layout** provides UI shared by pages, such as a header, navigation, or footer. Layouts can be nested, so a group of pages can share its own layout.

A root layout is required in the App Router:

```tsx
// app/layout.tsx
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>LearnCraft</header>
        {children}
      </body>
    </html>
  );
}
```

The `children` value is the page or nested layout shown inside the shared layout.

### Why it matters
You can build the shared parts once instead of repeating them on every page.

### Scenario question
**Your home, courses, and profile pages all need the same navigation bar. Should you copy it into all three pages?**

**Simple answer:** No. Put the shared navigation in a layout or a shared component so the pages can reuse it.

---

## Lesson 4: Moving Between Pages with `Link`
**Difficulty: Easy**

### Core idea
Use Next.js `Link` to navigate between routes in your app. It supports client-side navigation and Next.js navigation improvements.

```tsx
import Link from "next/link";

export default function HomePage() {
  return <Link href="/courses">View courses</Link>;
}
```

### Why it matters
It gives users a way to move around your app while using Next.js navigation features.

### Scenario question
**A user clicks “View courses” and should go to `/courses`. What should you use?**

**Simple answer:** Use `Link` from `next/link` with `href="/courses"`.

---

## Lesson 5: Dynamic Routes
**Difficulty: Moderate**

### Core idea
A dynamic route lets one page show different content based on part of the URL. Put a route name in square brackets, such as `[courseId]`.

```text
app/courses/[courseId]/page.tsx
```

In current App Router versions, `params` is asynchronous:

```tsx
// app/courses/[courseId]/page.tsx
export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <h1>Course: {courseId}</h1>;
}
```

Visiting `/courses/42` gives `courseId` the value `"42"`.

### Why it matters
You can use one page for many courses, products, users, or blog posts instead of creating a separate file for each one.

### Scenario question
**You have hundreds of courses. You want `/courses/12` and `/courses/25` to show different courses using the same page. How can you do that?**

**Simple answer:** Create `app/courses/[courseId]/page.tsx`, read `courseId` from `params`, and use it to load the correct course.

---

# Part 2: Server and Client Components

## Lesson 6: Server Components and Client Components
**Difficulty: Difficult**

### The main idea

Next.js has two kinds of components for different jobs:

- **Server Component:** prepares page content on the server. It is a good place to load data.
- **Client Component:** lets part of the page respond to the user, such as a button click.

In the Next.js App Router, components are Server Components by default. Use a Client Component only for the parts that need interaction or browser features.

### Example 1: A Server Component

Imagine a page that shows a list of courses. It needs to get the course list and show it. That part can be a Server Component.

```tsx
// app/courses/page.tsx

type Course = {
  id: number;
  title: string;
};

export default async function CoursesPage() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const courses: Course[] = await response.json();

  return (
    <main>
      <h1>Courses</h1>
      {courses.slice(0, 5).map((course) => (
        <p key={course.id}>{course.title}</p>
      ))}
    </main>
  );
}
```

**What to understand:** This component gets data and uses it to make the page. In a real project, the data could come from your database or your API.

### Example 2: A Client Component

Now imagine each course has a button that lets the learner save it as a favorite. The button needs to change when clicked, so make that small part a Client Component.

```tsx
// app/courses/FavoriteButton.tsx
"use client";

import { useState } from "react";

export default function FavoriteButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button onClick={() => setSaved(!saved)}>
      {saved ? "Saved" : "Add to favorites"}
    </button>
  );
}
```

**What to understand:** `"use client"` tells Next.js that this file is the start of a Client Component. The button uses `useState` to remember whether it has been clicked.

### How to choose between them

Ask yourself one simple question: **Does this part only need to show content, or must it respond to the user?**

- If it mainly loads and shows data, start with a Server Component.
- If it needs click handlers, state, `useEffect`, or browser features like `localStorage`, use a Client Component.
- You can use both on the same page. Keep the interactive Client Component small instead of making the whole page a Client Component.

### Remember this detail

A Client Component can still show HTML during the first page load. The word "Client" means it can also use JavaScript in the browser for interactions. It does **not** mean the user sees a blank page until JavaScript runs.

Never put private keys or other secrets in Client Component code.

### Scenario question

**You build a courses page. It loads course names from an API, and each course has a button to save it as a favorite. Should the whole page be a Client Component?**

**Simple answer:** No. Keep the page as a Server Component to load and show the courses. Make only the favorite button a Client Component because it needs to respond to clicks.

### Important interview question

**What is the difference between a Server Component and a Client Component?**

**Simple answer:** A Server Component is a good place to load data and prepare page content on the server. A Client Component is used for interactive parts that need clicks, state, or browser features. A page can use both.

## Lesson 7: Client-Side Interaction with State and Events
**Difficulty: Moderate**

### Core idea
Use a Client Component when a part of the page must respond to user actions. React state stores a value that can change and update the UI.

```tsx
"use client";

import { useState } from "react";

export default function ShowAnswer() {
  const [visible, setVisible] = useState(false);

  return (
    <section>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide answer" : "Show answer"}
      </button>
      {visible && <p>A Server Component runs on the server.</p>}
    </section>
  );
}
```

### How it works
- `useState(false)` starts with the answer hidden.
- Clicking the button changes `visible`.
- React renders the UI again using the new value.

### Scenario question
**You need a “Show answer” button that reveals text after a click. What kind of component do you need and why?**

**Simple answer:** A Client Component, because it uses a click event and state to update the UI.

---

# Part 3: Loading and Showing Data

## Lesson 8: Fetching Data in a Server Component
**Difficulty: Moderate**

### Core idea
A Server Component can be an `async` function and load data before it returns the page UI. This is useful when a page needs data from an API or a database.

```tsx
// app/posts/page.tsx
 type Post = { id: number; title: string };

export default async function PostsPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Could not load posts");
  }

  const posts: Post[] = await response.json();

  return (
    <ul>
      {posts.slice(0, 5).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Understand it step by step
1. `await fetch(...)` requests the data.
2. `response.ok` checks whether the HTTP response succeeded.
3. `await response.json()` reads the response body.
4. `.map()` creates one list item for each post.

### Why it matters
You can load data on the server without first putting the data-loading code in the browser. The code still needs proper error handling and, for private data, access checks.

### Scenario question
**A courses page needs a list of courses from your API. The list does not need browser interaction just to appear. Where is a good place to load the data?**

**Simple answer:** Load it in the Server Component for the page. Add a Client Component only for parts that need interaction.

---

## Lesson 9: URL Parameters and Search Parameters
**Difficulty: Moderate**

### Core idea
A dynamic route parameter comes from the path, while a search parameter comes after `?` in the URL.

Examples:
- `/courses/42` has a path parameter `courseId = "42"`.
- `/courses?level=beginner` has a search parameter `level = "beginner"`.

In an App Router page, `searchParams` is asynchronous in current versions:

```tsx
export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams;

  return <p>Selected level: {level ?? "all levels"}</p>;
}
```

### Why it matters
URLs can store which item a user is viewing or which filters are selected. This makes the page easier to share and bookmark.

### Scenario question
**A learner selects “beginner” courses, and the URL becomes `/courses?level=beginner`. Where do you read `level`?**

**Simple answer:** Read it from `searchParams` in the page, then use it to filter or load the matching courses.

---

## Lesson 10: Loading UI
**Difficulty: Moderate**

### Core idea
A `loading.tsx` file shows a loading UI while a route segment is waiting for content. It can make navigation feel faster because users get feedback rather than seeing nothing.

```tsx
// app/courses/loading.tsx
export default function Loading() {
  return <p>Loading courses...</p>;
}
```

### Why it matters
Some requests take time. A clear loading message or skeleton tells users that the app is working.

### Scenario question
**Your course page takes a few seconds to load. You want to show “Loading courses...” while Next.js loads the page. What can you add?**

**Simple answer:** Add a `loading.tsx` file in the relevant route folder and return the loading UI from it.

---

## Lesson 11: Handling Missing Pages and Errors
**Difficulty: Moderate**

### Core idea
Different problems need different responses:
- `not-found.tsx` shows a not-found page.
- `error.tsx` provides a UI for unexpected errors in a route segment. It is a Client Component.
- `notFound()` can stop rendering the current route when the requested item does not exist.

Example for a missing course:

```tsx
import { notFound } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await findCourse(courseId); // Your data function

  if (!course) {
    notFound();
  }

  return <h1>{course.title}</h1>;
}
```

`findCourse` is an example of a project function; define it to match your own data source.

### Why it matters
A missing course is different from an unexpected system error. Clear messages help users understand what happened.

### Scenario question
**A user opens `/courses/999`, but course 999 does not exist. Should you show a generic server error?**

**Simple answer:** No. Call `notFound()` and show a not-found page because the requested course does not exist.

---

# Part 4: Changing Data and Building Endpoints

## Lesson 12: Forms and Server Actions
**Difficulty: Difficult**

### Core idea
A Server Action is an async function that runs on the server. It can process a form submission, validate the input, and save changes. It must be treated as a server endpoint: check who is allowed to use it and validate the data.

```tsx
// app/actions.ts
"use server";

export async function saveCourse(formData: FormData) {
  const title = formData.get("title");

  if (typeof title !== "string" || title.trim() === "") {
    return { error: "Enter a course title." };
  }

  // Validate the user's permission and save the title here.
  return { success: true };
}
```

A form can call it:

```tsx
import { saveCourse } from "@/app/actions";

export default function NewCourseForm() {
  return (
    <form action={saveCourse}>
      <label htmlFor="title">Course title</label>
      <input id="title" name="title" />
      <button type="submit">Save course</button>
    </form>
  );
}
```

### Understand it step by step
1. The user enters a title and submits the form.
2. Next.js calls the Server Action on the server.
3. The action reads the form data and checks it.
4. Real code must also check the user's permission before changing data.
5. Then it can save the data and return a result.

### Why it matters
You can handle form submissions on the server without creating a separate Route Handler for every form. Validation and permission checks are still necessary.

### Scenario question
**A logged-in user submits a form to rename a course. What must the Server Action check before saving the new name?**

**Simple answer:** It must validate the new name and check that this user is allowed to rename that course. Being logged in does not automatically mean the user has permission to change every course.

### Important interview question
**What is a Server Action used for, and what security check must it include?**

**Simple answer:** A Server Action runs on the server to handle work such as form submissions and data changes. It must validate the input and check the user's permission before changing data.

---

## Lesson 13: Route Handlers
**Difficulty: Moderate**

### Core idea
A Route Handler defines an HTTP endpoint in a `route.ts` file. Use one when an external client or another service needs an API endpoint, or when you need a custom HTTP response.

```ts
// app/api/health/route.ts
export function GET() {
  return Response.json({ status: "ok" });
}
```

Opening `/api/health` sends a GET request and returns JSON.

### When to use it
- Use a Server Action when handling a UI action such as submitting an app form.
- Use a Route Handler when you need an HTTP endpoint, such as `GET /api/health` or a webhook endpoint.

### Scenario question
**A monitoring service needs to request `/api/health` and receive JSON showing whether your app is running. What should you create?**

**Simple answer:** Create `app/api/health/route.ts` and add a `GET` handler that returns a JSON response.

### Interview question
**What is the difference between a Server Action and a Route Handler?**

**Simple answer:** A Server Action is often used to perform an action from the app UI, such as saving a form. A Route Handler defines an HTTP endpoint that clients or services can call.

---

## Lesson 14: Revalidating Data After a Change
**Difficulty: Difficult**

### Core idea
Sometimes a page displays saved or cached data. After changing that data, the app may need to update the affected page or cached result. Next.js provides tools such as `revalidatePath` and `revalidateTag`; the right choice depends on how the project loads and caches its data.

A simple example after a course is updated:

```ts
"use server";

import { revalidatePath } from "next/cache";

export async function updateCourseTitle() {
  // Check permission, validate input, and update the course data here.
  revalidatePath("/courses");
}
```

This example shows the idea only; real code must do the actual update and security checks first.

### Understand it step by step
1. A learner or admin changes some data.
2. The server saves the change.
3. The app marks the affected path or tagged data for refresh.
4. Next.js can then load updated data according to the project's caching setup.

Caching behavior can vary with Next.js version and project configuration, so inspect the app's settings before choosing a caching method.

### Scenario question
**An admin edits a course title, but the course list still shows the old title because of the way its data is cached. What should you consider?**

**Simple answer:** After saving the new title, revalidate the affected route or data tag using the method that matches the project's caching setup.

---

# Part 5: Page Details and Project Safety

## Lesson 15: Page Titles and Metadata
**Difficulty: Easy**

### Core idea
Metadata describes a page to browsers and search services. It can include the page title and description. In the App Router, a Server Component can export `metadata` for a page.

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LearnCraft Courses",
  description: "Learn programming step by step.",
};

export default function CoursesPage() {
  return <h1>Courses</h1>;
}
```

### Why it matters
A good title helps users recognize the page in a browser tab, while a description can help describe the page in search results and link previews.

### Scenario question
**Your course page still shows the website's default browser-tab title. How can you set a better title for that page?**

**Simple answer:** Export a `metadata` object from the page or use `generateMetadata` when the title depends on data.

---

## Lesson 16: Images and Static Files
**Difficulty: Easy**

### Core idea
Use the `public` folder for static files that should be available by URL. Next.js also provides the `Image` component to help display and optimize images.

Example with a local image stored at `public/course-cover.png`:

```tsx
import Image from "next/image";

export default function CourseCard() {
  return (
    <Image
      src="/course-cover.png"
      alt="Course cover"
      width={600}
      height={340}
    />
  );
}
```

### Why it matters
The `Image` component provides image features and requires useful image information such as size or layout information. For remote images, configure the allowed host when required by Next.js.

### Scenario question
**You saved a file as `public/logo.png`. What path can you use to show it on the website?**

**Simple answer:** Use `/logo.png` as the path. For image display and optimization, you can use `next/image`.

---

## Lesson 17: Environment Variables and Secrets
**Difficulty: Moderate**

### Core idea
Environment variables store settings outside your source code. They are often used for API keys, database URLs, and app configuration. Variables without a `NEXT_PUBLIC_` prefix are intended for server-side use; values with `NEXT_PUBLIC_` may be included in browser JavaScript.

Example:

```ts
// Read on the server
const apiKey = process.env.PAYMENT_API_KEY;
```

Do not put a private key in a Client Component or name it `NEXT_PUBLIC_PAYMENT_API_KEY`.

### Why it matters
A secret key exposed to the browser can be copied and misused by other people. Keep private values on the server and keep `.env` files containing secrets out of version control.

### Scenario question
**Your app needs a private payment-provider key. Should you use `NEXT_PUBLIC_PAYMENT_API_KEY`?**

**Simple answer:** No. Keep the key in a server-only environment variable and use it from server-side code.

---

## Lesson 18: Authentication and Authorization
**Difficulty: Difficult**

### Core idea
These words mean different things:
- **Authentication:** Who is the user? For example, has the user signed in?
- **Authorization:** What is this user allowed to do? For example, can they edit this course?

Showing or hiding a button is not enough to protect data. The server must check permission when the user tries to access protected data or perform an action.

```ts
// Conceptual example: verify the user and permission before changing data.
export async function deleteCourse(courseId: string) {
  const user = await getCurrentUser(); // Use your project's auth solution

  if (!user) {
    throw new Error("You must sign in.");
  }

  const allowed = await userCanDeleteCourse(user.id, courseId);

  if (!allowed) {
    throw new Error("You cannot delete this course.");
  }

  await removeCourse(courseId);
}
```

The functions in this example represent project-specific logic; implement them with your real authentication and data layer.

### Understand it step by step
1. The user requests a protected action.
2. The server identifies the user through the app's authentication system.
3. The server checks whether that user has permission for this specific action.
4. Only then does it change the data.

### Scenario question
**A normal user changes the URL to an admin page. You already hide the admin link from normal users. Is that enough?**

**Simple answer:** No. Hiding a link only changes what the user sees. The server must still check the user's permission before returning protected data or allowing an admin action.

### Important interview question
**What is the difference between authentication and authorization?**

**Simple answer:** Authentication checks who the user is. Authorization checks what that user is allowed to do.

---

## Lesson 19: Validating User Input
**Difficulty: Moderate**

### Core idea
Never assume user input is correct just because the form has required fields. Validate important data on the server before saving it. Browser-side checks are helpful for users, but they can be bypassed.

```ts
function validateCourseTitle(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim().length < 3) {
    return { valid: false, message: "Title must have at least 3 characters." };
  }

  return { valid: true, title: value.trim() };
}
```

This small example checks that the value is text and has at least three characters. Real apps may use a schema validation library for more complex rules.

### Scenario question
**A form requires a course title, but someone sends a request directly without using the form. Can you trust the value?**

**Simple answer:** No. Validate the input on the server because requests can bypass browser-side checks.

---

## Lesson 20: Debugging Next.js Problems
**Difficulty: Moderate**

### Core idea
When a Next.js page fails, first identify where the problem happens. Common causes include a wrong file name, an incorrect route, a Server/Client Component mismatch, a failed data request, a missing environment variable, or a type error.

### A practical checklist
1. Read the first useful error message, not just the last line.
2. Check the file path and route convention.
3. Check whether the code uses browser APIs or event handlers in a Server Component.
4. Check data requests and their response status.
5. Check environment variables and whether they are available in the right environment.
6. Make one change at a time, then run the relevant checks again.

### Scenario question
**You get an error saying that `useState` can only be used in a Client Component. What should you check?**

**Simple answer:** Check that the component using `useState` is a Client Component and has `"use client"` at the top. Keep the client boundary as small as practical.

---

## Lesson 21: Website Performance Optimization
**Difficulty: Difficult**

### Core idea
Website performance means how quickly a page appears, how quickly it responds when someone uses it, and whether the page layout stays steady while loading. **Measure first, find the biggest problem, and fix that problem.** Do not add optimizations just because they sound advanced.

### 1. Start by measuring the page

Test a production build when possible. Development mode can behave differently and is not a reliable way to judge real page speed.

Run the scripts your project provides. A common setup is:

```bash
npm run build
npm run start
```

Open the page in Chrome, open DevTools, and use the **Lighthouse** tab to run a report. Check the suggestions under Performance instead of chasing a perfect score without understanding the problems.

Three useful measurements are:

- **LCP (Largest Contentful Paint):** How long the main visible content takes to appear.
- **INP (Interaction to Next Paint):** How quickly the page responds to user interactions in real use.
- **CLS (Cumulative Layout Shift):** How much the page unexpectedly moves while loading.

Lighthouse can help find LCP and layout-shift issues. In a lab test, Total Blocking Time (TBT) can help reveal work that may make interactions slow; real INP needs real user interactions and field data.

### 2. Optimize images

Large images can take a long time to download. In Next.js, use `next/image` for images when it fits your use case. Give the image its dimensions so the browser can reserve space before it loads. For responsive images, add `sizes` so the browser can choose a suitable file size.

```tsx
import Image from "next/image";

export default function CourseCover() {
  return (
    <Image
      src="/course-cover.jpg"
      alt="Course cover"
      width={1200}
      height={675}
      sizes="(max-width: 768px) 100vw, 600px"
    />
  );
}
```

Use smaller, properly sized image files and modern formats where possible. Do not load a huge desktop image when a smaller one is enough.

For an image that is clearly the main above-the-fold image and is the page's LCP element, Next.js 16 supports `preload`. Use it selectively, not for every image:

```tsx
<Image
  src="/home-hero.jpg"
  alt="LearnCraft learning dashboard"
  width={1600}
  height={900}
  sizes="100vw"
  preload
/>
```

Images farther down the page are normally loaded lazily by the Image component. Check the current project's Next.js version before copying version-specific props; in Next.js 16, `priority` is deprecated in favor of `preload`.

### 3. Optimize fonts

Loading too many font files or weights can slow the first page view. `next/font` helps host and optimize fonts with your app.

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
```

Apply the font's `className` to the `<body>` or another appropriate element in your layout. Load only the fonts and weights you actually use. A local font can also be loaded with `next/font/local`.

### 4. Send less JavaScript to the browser

Client-side JavaScript is needed for clicks and other interactive features, but too much JavaScript can delay loading and make interactions slow.

- Keep pages and data display in Server Components when they do not need browser interaction.
- Add `"use client"` only around the interactive part, instead of making a whole page a Client Component.
- Avoid adding large libraries when a small built-in solution is enough.
- Load heavy features, such as a chart editor or rich-text editor, only when the user needs them.

For example, a large Client Component can be loaded later with `next/dynamic` from a Client Component:

```tsx
"use client";

import dynamic from "next/dynamic";

const ReportChart = dynamic(() => import("./ReportChart"), {
  loading: () => <p>Loading chart...</p>,
});
```

Use this for genuinely heavy or optional features. Do not split every small component just to add more code.

### 5. Fetch data without unnecessary waiting

If two requests do not depend on one another, run them at the same time instead of waiting for the first request before starting the second.

```tsx
const [courses, categories] = await Promise.all([
  getCourses(),
  getCategories(),
]);
```

This can reduce the time spent waiting for independent requests. If the second request needs the first request's result, they cannot safely be run in parallel.

Do not fetch data in a Server Component by calling your own Route Handler if you can call the database or shared server function directly. Calling your own API route adds another network request.

If one slow part should not block the whole page, use a `loading.tsx` file or a React `<Suspense>` boundary so other content can appear while that part loads.

### 6. Choose the right caching approach

Caching saves the result of work so the app may not need to repeat it on every visit. It can make pages faster, but cached data can become old. Decide how fresh the data must be before choosing a cache setting.

**Important:** Next.js 16 has two caching setups. Check `next.config.ts` before copying an example. Do not mix these approaches blindly.

**If the project enables `cacheComponents: true`:** use the Cache Components approach for data that is safe to reuse. For example, a public course list can be cached for a while:

```tsx
import { cacheLife } from "next/cache";

export async function getPublicCourses() {
  "use cache";
  cacheLife("hours");

  return database.course.findMany();
}
```

Here `database` stands for your project's own database client. Replace it with the real function or client used in your project. Do not put request-specific or private user data into a shared cache unless the caching design safely separates users.

**If the project does not enable Cache Components:** choose caching explicitly for `fetch` requests when it makes sense:

```tsx
const response = await fetch("https://example.com/api/courses", {
  cache: "force-cache",
});
```

For data that should be refreshed regularly, the older caching model also supports a revalidation time:

```tsx
const response = await fetch("https://example.com/api/courses", {
  next: { revalidate: 60 },
});
```

These examples belong to different caching setups. Check the version and configuration before using them. For changing data, learn how the project revalidates the cache after updates, using the supported `revalidatePath`, `revalidateTag`, or Cache Components APIs for that setup.

### 7. Handle large amounts of data

Do not fetch thousands of records and send them all to the browser when the user only needs to see a small part of the list. Ask the data source for the specific page or range needed.

For example, a database query might return only 20 products at a time:

```ts
const pageSize = 20;
const page = Math.max(1, requestedPage);

const products = await database.product.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
});
```

`database` is a placeholder for your project's database client, and `requestedPage` must be parsed and validated from the URL or request. For very large or frequently changing datasets, cursor-based pagination can be more reliable than skipping a large number of rows; choose the method supported by your database and sorting needs.

**Pagination:** Split the list into pages, such as 20 results per page. Use it when people may need to jump to a particular page or share a URL.

**Infinite scrolling:** Load the next batch when the user reaches the end of the list. Use it for feeds where people naturally keep browsing. Include a loading state and a way to retry errors; avoid loading forever without a clear end.

**Virtualization:** If a page has hundreds or thousands of visible-list items, render only the rows near the screen instead of creating every row in the DOM. This is useful for large tables or long lists. It usually needs a library such as `@tanstack/react-virtual` or `react-window`; use one only when the list is large enough to benefit.

These techniques solve different problems: pagination limits data fetched at once, infinite scrolling changes how the next batch is requested, and virtualization limits how many items are rendered in the page at one time. They can be used together.

### 8. Use navigation and scripts carefully

Use Next.js `<Link>` for normal navigation between app pages. It supports client-side navigation and route prefetching where applicable. Avoid preloading every possible route or doing extra work that the user may never need.

Use the Next.js `<Script>` component and the appropriate loading strategy for third-party scripts, such as analytics or chat widgets. Delay non-essential scripts so they do not block the main page. Add only the third-party tools the app actually needs.

### 9. Find the real problem with DevTools

When a page is slow:

1. Run Lighthouse against a production build and note its main recommendations.
2. Open Chrome DevTools **Network**. Look for very large files, slow requests, and requests that start later than expected.
3. Open **Performance** and record a page load or interaction. Look for long tasks and expensive scripting.
4. Check **Console** for errors and warnings.
5. Fix the biggest confirmed cause first.
6. Run the same test again and compare the result.

A good score is useful, but do not optimize only for a number. Check the actual page on a realistic device and network, and check real user metrics when your app has them. Always measure before and after a change.

### 10. Other useful performance habits

- Keep database queries efficient and return only the fields the page needs.
- Avoid repeatedly requesting the same data when a safe shared function or the right cache can be used.
- Reduce layout shifts by reserving space for images, ads, and content that loads later.
- Analyze the JavaScript bundle if it seems large; a bundle analyzer can show which packages take up space.
- Use production builds when testing speed.
- Do not add memoization (`useMemo` or `useCallback`) everywhere. Use it when measurements show repeated work is a real problem or when it prevents a specific issue.

### Scenario question 1
**A course page loads slowly. It shows a large hero image, loads 2,000 course records, and imports a chart library even when the chart is hidden. What would you check first?**

**Simple answer:** Measure the page with Lighthouse and DevTools first. Then optimize the hero image, fetch only the course records needed for the current page, and load the chart library only when the chart is needed. Test again to see which changes helped.

### Scenario question 2
**You add caching and the page gets faster, but a user updates a course and still sees the old title. What should you investigate?**

**Simple answer:** Check how the cached data is refreshed. After the update succeeds, use the correct revalidation method for the project's Next.js caching setup so the old result is not kept longer than intended.

### Important interview question
**What are a few ways to improve performance in a Next.js app?**

**Simple answer:** Measure the problem first. Optimize images and fonts, reduce unnecessary Client Components and JavaScript, fetch independent data in parallel, cache reusable data safely, paginate large lists, lazy-load heavy features, and test again with Lighthouse and DevTools.

### Remember
Do not try every optimization at once. Measure the page, find the biggest problem, make one useful change, and measure again.

### Official references
- [Next.js Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Next.js Lazy Loading](https://nextjs.org/docs/app/guides/lazy-loading)
- [Next.js Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Next.js Caching with Cache Components](https://nextjs.org/docs/app/getting-started/revalidating)
- [Next.js Caching without Cache Components](https://nextjs.org/docs/app/guides/caching-without-cache-components)
- [Web Vitals](https://web.dev/articles/vitals)


# Topics intentionally kept brief or left out

This core track does not try to teach every Next.js API. Advanced streaming patterns, custom caching architecture, complex middleware/proxy rules, low-level rendering details, and deployment platform internals can be taught later if a real project needs them.

Do not teach React fundamentals again inside this course. Briefly explain React ideas when necessary to understand Next.js. Keep databases, authentication providers, styling systems, and deployment tools in their own focused learning material where appropriate.

# Official references

Use official Next.js documentation when a detail depends on the current version or project configuration:

- [App Router Getting Started](https://nextjs.org/docs/app/getting-started)
- [Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Mutating Data](https://nextjs.org/docs/app/getting-started/mutating-data)
- [Error Handling](https://nextjs.org/docs/app/getting-started/error-handling)
- [Authentication](https://nextjs.org/docs/app/guides/authentication)
- [Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Revalidating Data](https://nextjs.org/docs/app/getting-started/revalidating)

**Curriculum goal:** Help learners understand the main Next.js concepts, recognize them in code, use them in real situations, and explain important topics in interviews—without spending time on details they do not currently need.
