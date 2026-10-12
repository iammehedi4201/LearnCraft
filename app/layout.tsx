import type { Metadata } from "next";
import { Inter, Rajdhani, Manrope } from "next/font/google";
import "./globals.css";
import "@/components/reading-control-panel.css";
import "@/components/playground/playground.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { RevisionProvider } from "@/context/revision-context";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { GlobalOverlays } from "@/components/global-overlays";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "LearnCraft — Master Modern Web Tech",
  description: "High-impact engineering education for modern developers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${inter.variable} ${rajdhani.variable} min-h-screen`}
      >
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider>
              <RevisionProvider>
                <Suspense fallback={null}>
                  {children}
                </Suspense>
                <GlobalOverlays />
              </RevisionProvider>
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
