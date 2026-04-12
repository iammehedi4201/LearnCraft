"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX10RouteHandlers(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-10"
          featureName="Route Handlers"
          tanstackConcept="N/A"
          howItWorks="route.ts (or route.js) files create API endpoints. Folder structure becomes the API route. Export HTTP method functions: GET, POST, PUT, DELETE, etc. These functions receive a Request and return a Response. No need for a separate backend framework."
          nextjsConcept="Route Handlers replace the old Pages Router /api directory pattern. Use /app/api/* routes to build REST APIs directly in Next.js. Full control over Request and Response objects."
          whenToUse="Create API endpoints for data fetching, webhooks, database operations, or any server-side logic."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Route Handlers Setup</h2>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">File Structure</h3>
            <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`app/api/
├── route.ts           ← Handles /api endpoint (GET, POST, etc.)
├── posts/
│   ├── route.ts       ← Handles /api/posts (GET all, POST create)
│   └── [id]/
│       └── route.ts   ← Handles /api/posts/1 (GET one, PUT, DELETE)
├── auth/
│   └── login/
│       └── route.ts   ← Handles /api/auth/login (POST)
└── webhooks/
    └── stripe/
        └── route.ts   ← Handles /api/webhooks/stripe (POST)`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900">Code Examples</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">GET Request Handler</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/api/posts/route.ts
export async function GET(request: Request) {
  // Get query parameters: /api/posts?limit=10&page=1
  const searchParams = new URL(request.url).searchParams;
  const limit = searchParams.get('limit') || '10';

  // Fetch from database, extern

al API, etc.
  const posts = await db.posts.findMany({ limit: parseInt(limit) });

  return Response.json(posts);
}

// Access at: GET http://localhost:3001/api/posts
// Or:        GET http://localhost:3001/api/posts?limit=5`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">POST Request Handler</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/api/posts/route.ts (same file, different method)
export async function POST(request: Request) {
  const data = await request.json();

  // Validate and save to database
  const post = await db.posts.create({
    title: data.title,
    content: data.content,
  });

  return Response.json(post, { status: 201 });
}

// Access at: POST http://localhost:3001/api/posts
// Body: { "title": "New Post", "content": "..." }`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Dynamic Route Handler</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await db.posts.findUnique({ id: params.id });
  
  if (!post) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const post = await db.posts.update(params.id, data);
  return Response.json(post);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await db.posts.delete(params.id);
  return Response.json({ ok: true });
}

// Access at:
// GET    /api/posts/1
// PUT    /api/posts/1
// DELETE /api/posts/1`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Error Handling</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// app/api/posts/route.ts
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation
    if (!data.title) {
      return Response.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const post = await db.posts.create(data);
    return Response.json(post, { status: 201 });

  } catch (error) {
    console.error('POST /api/posts error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• route.ts files create API endpoints</li>
              <li>• Export functions named after HTTP methods: GET, POST, PUT, DELETE</li>
              <li>• Access database, external APIs, and secrets safely</li>
              <li>• Receive Request and return Response</li>
              <li>• Folder structure becomes the API route path</li>
              <li>• Use for backend logic, webhooks, or microservices</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
