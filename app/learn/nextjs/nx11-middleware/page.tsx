"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX11Middleware(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-11"
          featureName="Middleware"
          tanstackConcept="N/A"
          howItWorks="middleware.ts runs on every request before routing. It receives the request and can modify headers, redirect, or deny access. Middleware runs at the edge, close to your users, for fast execution."
          nextjsConcept="Middleware is similar to Express middleware. It's ideal for authentication checks, logging, security headers, URL rewrites, or request validation before reaching your pages."
          whenToUse="Authentication, authorization, logging, security headers, URL rewrites, or any pre-routing logic."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Middleware Patterns</h2>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">File Location</h3>
            <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`middleware.ts (or .js) goes at the root of your project:

your-project/
├── app/
├── middleware.ts          ← Middleware file (runs on every request)
├── package.json
└── tsconfig.json`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-900">Code Examples</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Authentication Middleware</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // If no token and user tries to access /dashboard, redirect to login
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Otherwise, allow the request
  return NextResponse.next();
}

// Run middleware only on specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Add Security Headers</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: ['/:path*'], // Apply to all routes
};`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Redirect Based on URL Pattern</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect old URLs to new ones
  if (request.nextUrl.pathname === '/old-blog') {
    return NextResponse.redirect(new URL('/blog', request.url));
  }

  // Check geo-location
  const country = request.geo?.country;
  
  // Redirect based on country
  if (country === 'US' && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/us-home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Request Logging</h4>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Log request details
  console.log({
    method: request.method,
    path: request.nextUrl.pathname,
    ip: request.ip,
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.next();
}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• middleware.ts runs on every request before routing</li>
              <li>• Ideal for authentication, logging, security headers</li>
              <li>• Can redirect or deny requests</li>
              <li>• Runs at the edge (geographically close to users)</li>
              <li>• Use matcher config to target specific routes</li>
              <li>• Access request headers, cookies, and geo information</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
