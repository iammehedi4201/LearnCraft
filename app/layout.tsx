/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ROOT LAYOUT — QueryClientProvider Setup
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * This root layout wraps the entire application with QueryClientProvider.
 * This provider makes the QueryClient instance available to all child components
 * via React Context, enabling useQuery, useMutation, and other TanStack Query hooks.
 *
 * The "use client" directive tells Next.js to render this component on the client,
 * which is required because QueryClientProvider is a React Context provider
 * (Context only works in client components).
 *
 * The React Query Devtools are also mounted here in development mode for debugging.
 *
 * KEY CONCEPT: Server/Client Boundary
 * Next.js 14 App Router defaults to Server Components. By marking this layout
 * "use client", we're creating a client boundary. Pages under this layout can
 * still be Server Components (default), but they can access client-only features
 * like React hooks and the QueryClient context.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client";

import "./globals.css";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>LearnCraft — Master Modern Web Tech</title>
        <meta name="description" content="Redesigned Learning Hub for Next.js & TanStack Query" />
      </head>
      <body className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-indigo-50 selection:bg-blue-100 selection:text-blue-900">
        <QueryClientProvider client={queryClient}>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}

